import Link from "next/link";

// Text edited in the admin where [link text](/address) becomes a link, e.g.
// "Myntmore is a premier [B2B lead generation company in Mumbai](/b2b-lead-generation-mumbai)."
// Each page passes its own link style.
export default function RichText({ text, linkClassName, linkStyle }: { text: string; linkClassName?: string; linkStyle?: React.CSSProperties }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)\s]+\))/g).map((part, i) => {
        const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
        if (!m) return part;
        const [, label, href] = m;
        return /^(https?:|mailto:|tel:)/.test(href) ? (
          <a key={i} href={href} className={linkClassName} style={linkStyle} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {label}
          </a>
        ) : (
          <Link key={i} href={href} className={linkClassName} style={linkStyle}>
            {label}
          </Link>
        );
      })}
    </>
  );
}
