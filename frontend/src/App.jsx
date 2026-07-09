import { Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutReturnPage from "./pages/CheckoutReturnPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { SentryDemoPage } from "./pages/SentryDemoPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderChatPage from "./pages/OrderChatPage";
import OrderVideoPage from "./pages/OrderVideoPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import SupportTicketPage from "./pages/SupportTicketPage";
import SupportVideoPage from "./pages/SupportVideoPage";
import AdminSupportPage from "./pages/AdminSupportPage";
import { setDefaultCurrency } from "./utils/format";
import { useEffect } from "react";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((c) => { if (c?.currency) setDefaultCurrency(c.currency); })
      .catch(() => {});
  }, []);

  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route
          path="/orders"
          element={isSignedIn ? <OrdersPage /> : <Navigate to={"/"} replace />}
        />
        <Route path="/checkout/return" element={<CheckoutReturnPage />} />

        <Route path="/demo-sentry" element={<SentryDemoPage />} />

        <Route
          path="/orders/:id/call"
          element={isSignedIn ? <OrderVideoPage /> : <Navigate to={"/"} replace />}
        />

        <Route
          path="/admin"
          element={isSignedIn ? <AdminProductsPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/admin/support"
          element={isSignedIn ? <AdminSupportPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/support/:id"
          element={isSignedIn ? <SupportTicketPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/support/:id/call"
          element={isSignedIn ? <SupportVideoPage /> : <Navigate to="/" replace />}
        />

        {/* NESTED ROUTES */}
        <Route path="/orders/:id" element={<OrderDetailPage />}>
          <Route index element={<OrderSummaryPage />} />
          <Route path="chat" element={<OrderChatPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;