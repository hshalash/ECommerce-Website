import { useContext } from "react";
import { OrderContext } from "../../Context/OrderContext";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function AllOrders() {
  let { getAllOrders } = useContext(OrderContext);

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    staleTime: 5000,
    cacheTime: 10000,
  });

  if (isLoading) {
    return (
      <div className="h1 text-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error?.message || "Failed to fetch orders"}</p>;
  }

  return (
    <div>
      <h2 className="pt-32 text-green-600 text-center uppercase text-4xl mb-10">My Orders</h2>
      <div className="container-fluid flex justify-center items-center">
        {orders?.map((order) => {
          return (
            <div key={order._id}>
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-green-600 text-xl font-medium flex justify-between">
                  <div>{"Order Date: " + order.createdAt?.slice(0, 10)}</div>
                  <div>
                    {"Order Price: EGP " +
                      order.totalOrderPrice?.toLocaleString()}
                  </div>{" "}
                </div>
                <div className="collapse-content">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Item Name</th>
                          <th>Count</th>
                          <th>Price/Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems?.map((item) => {
                          return (
                            <tr key={item._id}>
                              <td>
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      src={item.product.imageCover}
                                      alt={item.product.title}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td>{item.product.title}</td>
                              <td>{item.count}</td>
                              <td>{"EGP " + item.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
