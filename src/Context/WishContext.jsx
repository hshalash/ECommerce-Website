import axios from "axios";
import { createContext } from "react";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  let headers = {
    token: localStorage.getItem("token"),
  };

  function getWishlist() {
    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",

        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }
  function addToWishlist(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }
  function removeItemFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  return (
    <WishContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        removeItemFromWishlist,
      }}
    >
      {props.children}
    </WishContext.Provider>
  );
}
