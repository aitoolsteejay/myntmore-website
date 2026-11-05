import Navbar from "./Navbar";
import Footer from "./Footer";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip" style={{ backgroundColor: "#F8F6F2" }}>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
