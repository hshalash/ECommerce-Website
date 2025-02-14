import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export let OrderContext = createContext();

export default function OrderContextProvider(props) {
  let token = localStorage.getItem("token");

  let headers = {
    token: token,
  };

  function getAllOrders() {
    try {
      const decodedToken = jwtDecode(token);

      const userId = decodedToken.id;
      return axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,

          {
            headers,
          }
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error fetching orders:", error);
          throw error;
        });
    } catch (error) {
      console.error("Error decoding token:", error);
      throw error;
    }
  }

  return (
    <OrderContext.Provider
      value={{
        getAllOrders,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}
