#!/usr/bin/env python3
"""Crawl every URL in the live sitemap and check it against the SEO rules.

    python3 scripts/seo-crawl.py                 # live site, human-readable report
    python3 scripts/seo-crawl.py --json out.json # also write raw per-page results
    python3 scripts/seo-crawl.py --base http://localhost:3102

Exit code is 1 if any FAIL check is non-zero, so it can gate a deploy or a
weekly routine. Standard library only.

Site Health % and Schema Coverage % use the same rules as the weekly KPI
scorecard so week-over-week numbers stay comparable:
  Site Health  = % of sitemap URLs that return 200 with no redirect, have a
                 self-referencing canonical, no noindex, exactly one h1,
                 title <=60 chars, description <=160 chars, valid JSON-LD.
  Schema       = % of sitemap URLs with page-specific JSON-LD (anything beyond
                 the sitewide Organization + BreadcrumbList).
WARN checks (description 156-160 or under 120, thin pages, missing og:image or
other Open Graph tags, og:title over 70, ...) don't affect those percentages or
the exit code.
"""
import argparse, concurrent.futures as cf, html, json, re, sys, urllib.error, urllib.request
from collections import defaultdict
from urllib.parse import urljoin, urlparse

ap = argparse.ArgumentParser()
ap.add_argument("--base", default="https://www.myntmore.com")
ap.add_argument("--json", dest="json_out")
args = ap.parse_args()
BASE = args.base.rstrip("/")
UA = {"User-Agent": "Mozilla/5.0 (Myntmore SEO crawl)"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


opener = urllib.request.build_opener(NoRedirect)


def fetch(url, retries=2):
    for attempt in range(retries + 1):
        try:
            r = opener.open(urllib.request.Request(url, headers=UA), timeout=60)
            return r.status, r.read().decode("utf8", "replace")
        except urllib.error.HTTPError as e:
            return e.code, (e.read().decode("utf8", "replace") if e.code == 404 else "")
        except Exception:
            if attempt == retries:
                return 0, ""


def attr(tag, name):
    m = re.search(r"\b" + name + r'\s*=\s*"([^"]*)"', tag)
    return html.unescape(m.group(1)) if m else None


def path_of(url):
    p = urlparse(url).path.rstrip("/")
    return p or "/"


sitemap_status, sitemap_xml = fetch(BASE + "/sitemap.xml")
if sitemap_status != 200:
    sys.exit(f"Could not fetch {BASE}/sitemap.xml (status {sitemap_status})")
sitemap_paths = sorted({path_of(u) for u in re.findall(r"<loc>([^<]*)</loc>", sitemap_xml)})


def analyse(path):
    status, body = fetch(BASE + (path if path != "/" else "/"))
    r = {"path": path, "status": status, "fails": [], "warns": []}
    if status != 200:
        r["fails"].append(f"status {status}")
        return r
    head_m = re.search(r"<head.*?</head>", body, re.S)
    head = head_m.group(0) if head_m else body
    main = re.sub(r"<(script|style|noscript)\b.*?</\1>", "", body, flags=re.S)
    metas = re.findall(r"<meta\b[^>]*>", head)
    meta = lambda n, key="name": next((attr(m, "content") for m in metas if attr(m, key) == n), None)

    t = re.search(r"<title[^>]*>(.*?)</title>", head, re.S)
    title = html.unescape(t.group(1).strip()) if t else ""
    desc = meta("description") or ""
    robots = (meta("robots") or "").lower()
    canon = [attr(l, "href") for l in re.findall(r'<link\b[^>]*rel="canonical"[^>]*>', head)]
    h1s = re.findall(r"<h1\b", main)
    r.update(title=title, desc=desc)

    if not title: r["fails"].append("missing title")
    elif len(title) > 60: r["fails"].append(f"title {len(title)} chars (>60)")
    if not desc: r["fails"].append("missing description")
    elif len(desc) > 160: r["fails"].append(f"description {len(desc)} chars (>160)")
    elif len(desc) > 155: r["warns"].append(f"description {len(desc)} chars (>155)")
    if "noindex" in robots: r["fails"].append("noindex but listed in sitemap")
    if len(canon) != 1: r["fails"].append(f"{len(canon)} canonical tags")
    elif path_of(canon[0]) != path or urlparse(canon[0]).netloc != urlparse(BASE).netloc and BASE.startswith("https://www.myntmore.com"):
        r["fails"].append(f"canonical points elsewhere ({canon[0]})")
    if len(h1s) != 1: r["fails"].append(f"{len(h1s)} h1 tags")

    types, bad = [], 0
    for m in re.finditer(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', body, re.S):
        try:
            j = json.loads(m.group(1))
            types.append(j.get("@type") if isinstance(j, dict) else "list")
        except Exception:
            bad += 1
    if bad: r["fails"].append(f"{bad} invalid JSON-LD block(s)")
    r["schema_types"] = types
    r["page_schema"] = any(x not in ("Organization", "BreadcrumbList", "WebSite") for x in types)
    if not r["page_schema"]: r["warns"].append("no page-specific JSON-LD")

    imgs = re.findall(r"<img\b[^>]*>", main)
    if any(attr(i, "alt") in (None, "") for i in imgs): r["warns"].append("image(s) without alt text")
    if not meta("og:image", "property"): r["warns"].append("no og:image")
    # Social-card tags. A page that sets its own openGraph replaces the root layout's, so these
    # only stay present while each page spreads OG_BASE (lib/og.ts).
    for k in ("title", "description", "url", "type", "site_name", "locale"):
        if not meta("og:" + k, "property"): r["warns"].append(f"no og:{k}")
    og_title = meta("og:title", "property") or ""
    if len(og_title) > 70: r["warns"].append(f"og:title {len(og_title)} chars (>70, X cuts card titles there)")
    if desc and len(desc) < 120: r["warns"].append(f"description {len(desc)} chars (<120)")
    main_m = re.search(r"<main\b.*?</main>", main, re.S)  # page content only, not nav/footer
    words = len(html.unescape(re.sub(r"<[^>]+>", " ", main_m.group(0) if main_m else main)).split())
    # Content standard: new blog posts 800+ words of body copy, glossary 300+ (checklist tasks C-B1, C-B2)
    if path.startswith("/resources/blogs/") and words < 600: r["warns"].append(f"thin blog post ({words} words, target 800+)")
    elif path.startswith("/resources/glossary/") and path != "/resources/glossary" and words < 250: r["warns"].append(f"thin glossary entry ({words} words, target 300+)")
    r["words"] = words
    links = set()
    for a in re.findall(r"<a\b[^>]*>", main):
        href = attr(a, "href")
        if not href or href.startswith(("mailto:", "tel:", "javascript:", "#")):
            continue
        u = urljoin(BASE + path, href)
        if urlparse(u).netloc.replace("www.", "") == urlparse(BASE).netloc.replace("www.", ""):
            links.add(path_of(u))
    r["links"] = sorted(links)
    return r


with cf.ThreadPoolExecutor(8) as ex:
    results = list(ex.map(analyse, sitemap_paths))
by_path = {r["path"]: r for r in results}

# duplicates
for key, label in (("title", "duplicate title"), ("desc", "duplicate description")):
    groups = defaultdict(list)
    for r in results:
        if r.get(key): groups[r[key]].append(r["path"])
    for paths in groups.values():
        if len(paths) > 1:
            for p in paths: by_path[p]["fails"].append(f"{label} (shared with {len(paths) - 1} other page(s))")

# internal links: every target must be a 200 that isn't a redirect
targets = defaultdict(set)
for r in results:
    for l in r.get("links", []): targets[l].add(r["path"])
unknown = [t for t in targets if t not in by_path]
with cf.ThreadPoolExecutor(8) as ex:
    unk_status = dict(zip(unknown, ex.map(lambda t: fetch(BASE + t)[0], unknown)))
broken = {t: s for t, s in unk_status.items() if s != 200}

# indexable pages found by the site-audit data but missing from the sitemap
missing_from_sitemap = []
try:
    audit = json.load(open("app/site-audit/data.json"))
    for p in audit["pages"]:
        # Dynamic route templates (/case-studies/[filter]) are not URLs: their concrete
        # pages are in the sitemap on their own, so only literal paths are compared.
        if p.get("path") and "[" not in p["path"] and not p["noindex"] and p["path"] not in by_path:
            missing_from_sitemap.append(p["path"])
except Exception:
    pass

n = len(results)
healthy = sum(1 for r in results if not r["fails"])
schema_ok = sum(1 for r in results if r.get("page_schema"))


def section(title, items):
    print(f"{'FAIL' if items else 'PASS'}  {title}: {len(items)}")
    for i in items[:40]: print("      ", i)
    if len(items) > 40: print(f"       ... and {len(items) - 40} more")


print(f"Crawled {n} sitemap URLs from {BASE}/sitemap.xml")
fail_groups = defaultdict(list)
for r in results:
    for f in r["fails"]: fail_groups[re.sub(r"[\d]+ chars|\(shared with.*\)|\(https?://[^)]*\)|\d+ (?=h1|canonical|invalid)", "", f).strip()].append(f"{r['path']}  [{f}]")
for name in ["status", "missing title", "title", "missing description", "description", "noindex but listed in sitemap", "canonical tags",
             "canonical points elsewhere", "h1 tags", "invalid JSON-LD block(s)", "duplicate title", "duplicate description"]:
    items = [x for k, v in fail_groups.items() if k.startswith(name) for x in v]
    section(name, items)
section("internal links to non-200 / redirecting URLs", [f"{t} -> {s}  (linked from {sorted(targets[t])[:2]})" for t, s in sorted(broken.items())])
section("indexable pages missing from sitemap (per /site-audit data)", missing_from_sitemap)

warns = defaultdict(list)
for r in results:
    for w in r["warns"]: warns[re.sub(r"\d+ (chars|words)", "N \\1", w).strip()].append(r["path"])
print("\nWARN (do not affect Site Health or exit code):")
for k, v in sorted(warns.items()): print(f"   {len(v):3}  {k}: {', '.join(v[:4])}{' ...' if len(v) > 4 else ''}")

print(f"\nSite Health : {healthy}/{n} = {healthy / n:.1%}")
print(f"Schema      : {schema_ok}/{n} = {schema_ok / n:.1%}")
if args.json_out:
    json.dump({"base": BASE, "results": results, "broken_links": broken, "missing_from_sitemap": missing_from_sitemap}, open(args.json_out, "w"), indent=1)
total_fail = sum(len(r["fails"]) for r in results) + len(broken) + len(missing_from_sitemap)
sys.exit(1 if total_fail else 0)
