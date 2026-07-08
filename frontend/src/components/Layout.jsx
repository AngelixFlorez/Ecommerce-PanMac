import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div
      className="flex min-h-svh flex-col bg-base-200 text-base-content"
      style={{
        backgroundImage: "url('/logo.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "400px",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">{children}</main>

      <Footer />
    </div>
  );
}
export default Layout;
