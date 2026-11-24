import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Myntmore admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // Everything in the admin is set in Helvetica (Arial where Helvetica is not installed).
  return (
    <div className="admin-root min-h-screen bg-[#F8F6F2] text-[#0A0A0A]">
      <style>{`.admin-root, .admin-root * { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important; }`}</style>
      {children}
    </div>
  );
}
