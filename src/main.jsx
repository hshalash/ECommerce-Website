import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext.jsx";
import WishContextProvider from "./Context/WishContext.jsx";
import OrderContextProvider from "./Context/OrderContext.jsx";
import "flowbite/dist/flowbite.min.js";

let query = new QueryClient();

createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <StrictMode>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <WishContextProvider>
            <OrderContextProvider>
              <App />
            </OrderContextProvider>
            <ReactQueryDevtools />
          </WishContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </StrictMode>
  </CartContextProvider>
);
