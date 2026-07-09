import { useLocation } from "react-router";
import { useAuth } from "@clerk/react";
import { useEffect, useRef } from "react";
import { useCart } from "../store/cart";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  const { pathname } = useLocation();
  const { userId, isLoaded } = useAuth();
  const clearCart = useCart((s) => s.clear);
  const prevUserId = useRef(userId);

  useEffect(() => {
    if (!isLoaded) return;
    if (prevUserId.current && !userId) {
      clearCart();
    }
    prevUserId.current = userId;
  }, [userId, isLoaded, clearCart]);

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
