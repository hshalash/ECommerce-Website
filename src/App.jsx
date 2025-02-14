import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AllOrders from "./components/AllOrders/AllOrders";

export default function App() {


  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "reset", element: <ResetPassword /> },
        { path: "forgot", element: <ForgotPassword /> },
        { path: "verify", element: <VerifyCode /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
    
        <RouterProvider router={router} />
        <ToastContainer />
    
    </>
  );
}
