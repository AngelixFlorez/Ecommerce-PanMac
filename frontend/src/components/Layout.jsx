import { useLocation } from "react-router";
import { useClerk } from "@clerk/react";
import { useEffect } from "react";
import { useCart } from "../store/cart";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  const { pathname } = useLocation();
  const clerk = useClerk();
  const clearCart = useCart((s) => s.clear);

  useEffect(() => {
    if (!clerk?.addListener) return;
    let hadUser = false;
    const listener = (event) => {
      if (event.user) {
        hadUser = true;
      } else if (hadUser) {
        clearCart();
      }
    };
    clerk.addListener(listener);
    return () => {
      try { clerk.removeListener(listener); } catch {}
    };
  }, [clerk, clearCart]);

  const isProductPage = pathname.startsWith("/product/");

  return (
    <div
      className="flex min-h-svh flex-col bg-base-200 text-base-content"
      style={
        isProductPage
          ? {}
          : {
              backgroundImage: "url('/logo.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "400px",
              backgroundAttachment: "fixed",
            }
      }
    >
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">{children}</main>

      <Footer />
    </div>
  );
}
export default Layout;
