import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  let headers = {
    token: localStorage.getItem("token"),
  };

  function getCartItems() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        if (response?.data) {
          setNumOfCartItems(response.data.numOfCartItems || 0);
        }
        return response;
      })
      .catch((error) => error);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        if (response?.data) {
          setNumOfCartItems(response.data.numOfCartItems || 0);
        }
        return response;
      })
      .catch((error) => error);
  }

  function updateCartItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => {
        if (response?.data) {
          setNumOfCartItems(response.data.numOfCartItems || 0);
        }
        return response;
      })
      .catch((error) => error);
  }

  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((response) => {
        if (response?.data) {
          setNumOfCartItems(response.data.numOfCartItems || 0);
        }
        return response.data;
      })
      .catch((err) => err);
  }

  function deleteCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        if (response?.data) {
          setNumOfCartItems(response.data.numOfCartItems || 0);
        }
        return response.data;
      })
      .catch((err) => err);
  }

  function checkoutSession(cID, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cID}?url=http://localhost:5173`,
        {
          "shippingAddress": shippingAddress,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data) {
          setNumOfCartItems(response.data.numOfCartItems || 0);
        }
        return response.data;
      })
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItems,
        removeCartItem,
        updateCartItem,
        numOfCartItems,
        deleteCart,
        checkoutSession,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
