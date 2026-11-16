import { describe, expect, it } from "vitest";
import { renderPageMarkdown } from "./render";

const canonical = new URL("https://www.myntmore.com/services/gtm-strategy");
const head = `<link rel="canonical" href="${canonical.href}">`;

function html(main: string, metadata = head) {
  return `<!doctype html><html><head>${metadata}</head><body>
    <nav>Site navigation</nav><main>${main}</main><footer>Site footer</footer>
  </body></html>`;
}

describe("renderPageMarkdown", () => {
  it("keeps substantive page content and excludes interface elements", () => {
    const output = renderPageMarkdown(html(`
      <h1><span>Myntmore</span><span>GTM strategy</span></h1>
      <a href="/services"><div><h2>Services</h2><p>Account research.</p></div></a>
      <h3>Results</h3><p>Campaigns booked <strong>12 meetings</strong>.</p>
      <div class="flex justify-between"><span>Meetings booked</span><span>12</span></div>
      <ul><li>Discovery</li><li>Follow-up</li></ul>
      <table><tr><th>Metric</th><th>Count</th></tr><tr><td>Meetings</td><td>12</td></tr></table>
      <img alt="GTM pipeline" src="/logo.png"><p>A [B] test</p>
      <form>Form copy</form><p hidden>Hidden copy</p><script>scriptCopy()</script>
      <div data-markdown-ignore>Duplicate widget</div>
    `), canonical);

    expect(output).toContain("# Myntmore GTM strategy\n");
    expect(output).toContain("## [Services](https://www.myntmore.com/services)");
    expect(output).toContain("### Results");
    expect(output).toContain("Campaigns booked **12 meetings**.");
    expect(output).toContain("Meetings booked 12");
    expect(output).toContain("- Discovery\n- Follow-up");
    expect(output).toContain("| Metric | Count |\n| --- | --- |\n| Meetings | 12 |");
    expect(output).toContain("![GTM pipeline](https://www.myntmore.com/logo.png)");
    expect(output).toContain("A \\[B\\] test");
    expect(output).toContain(`[Original page](${canonical.href})`);
    expect(output).not.toMatch(/Site navigation|Site footer|Form copy|Hidden copy|scriptCopy|Duplicate widget/);
  });

  it("reflects changed text from the same HTML source", () => {
    const render = (text: string) => renderPageMarkdown(html(`<h1>Results</h1><p>${text}</p>`), canonical);
    expect(render("12 meetings")).toContain("12 meetings");
    expect(render("15 meetings")).toContain("15 meetings");
    expect(render("15 meetings")).not.toContain("12 meetings");
  });

  it("rejects noncanonical, noindex and missing main content", () => {
    const main = "<h1>Results</h1><p>Details</p>";
    expect(renderPageMarkdown(html(main, head + '<meta name="robots" content="noindex, follow">'), canonical)).toBeNull();
    expect(renderPageMarkdown(html(main), canonical, "noindex, follow")).toBeNull();
    expect(renderPageMarkdown(html(main, '<link rel="canonical" href="/services">'), canonical)).toBeNull();
    expect(renderPageMarkdown(html("<p>Details</p>"), canonical)).toBeNull();
  });
});
