import { NextResponse } from "next/server";

// Serves a downloadable vCard (.vcf) so a phone's "Save Contact" / "Add to
// Contacts" prompt appears automatically, rather than linking to a static
// file (whose content-type the static file server may not set correctly).
const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Fernandes;Enwil;;;",
  "FN:Enwil Fernandes",
  "ORG:Myntmore",
  "TITLE:Head of Sales",
  "TEL;TYPE=CELL,VOICE:+918169318951",
  "EMAIL;TYPE=WORK:enwil@myntmore.com",
  "URL;TYPE=WORK:https://www.myntmore.com",
  "URL;TYPE=LinkedIn:https://www.linkedin.com/in/enwill-ferrnandes/",
  "PHOTO;VALUE=URI:https://www.myntmore.com/enwil.png",
  "NOTE:Head of Sales at Myntmore.",
  "END:VCARD",
].join("\r\n");

export async function GET() {
  return new NextResponse(VCARD, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Enwil-Fernandes.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
