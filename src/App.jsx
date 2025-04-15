import { HashRouter, Routes, Route } from "react-router-dom";
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
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="cart" element ={<ProtectedRoute><Cart/></ProtectedRoute>}/>
            <Route path="wishlist" element ={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
            <Route path="products" element ={<ProtectedRoute><Products/></ProtectedRoute>}/>
            <Route path="categories" element ={<ProtectedRoute><Categories/></ProtectedRoute>}/>
            <Route path="brands" element ={<ProtectedRoute><Brands/></ProtectedRoute>}/>
            <Route path="allorders" element ={<ProtectedRoute><AllOrders/></ProtectedRoute>}/>
            <Route path="productdetails/:id" element ={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
            <Route path="register" element ={<Register/>}/>
            <Route path="login" element ={<Login/>}/>
            <Route path="reset" element ={<ResetPassword/>}/>
            <Route path="forgot" element ={<ForgotPassword/>}/>
            <Route path="verify" element ={<VerifyCode/>}/>
            <Route path="*" element ={<NotFound/>}/>
          </Route>
        </Routes>
      </HashRouter>

      <ToastContainer />
    </>
  );
}
