import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { useState } from "react";
import { useFormik } from "formik";

export default function Cart() {
  let {
    getCartItems,
    removeCartItem,
    updateCartItem,
    deleteCart,
    checkoutSession,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartID, setCartID] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  async function getCart() {
    let response = await getCartItems();

    if (response?.data) {
      console.log(response);
      setCartID(response.data.cartId);
      setCartDetails(response.data);
      setNumOfCartItems(response.data.numOfCartItems);
      setTotalCartPrice(
        response.data.data.totalCartPrice.toLocaleString() || 0
      );
    }
  }

  async function updateQuantity(productId, count) {
    let response = await updateCartItem(productId, count);
    setCartDetails(response.data);
  }
  async function clearCart() {
    let response = await deleteCart();
    setCartDetails(response.data);
    getCart();
  }

  async function removeItem(productId) {
    let response = await removeCartItem(productId);
    if (response.status == 200) {
      setCartDetails(response.data);
      getCart();
    }
  }

  async function handleCheckoutSession(value) {
    let response = await checkoutSession(cartID, value);
    if (response.status == "success") {
      setCartDetails(response.data);
      clearCart();
      getCart();
      console.log(response.session.url);
      location.href = response.session.url;
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleCheckoutSession,
  });

  useEffect(() => {}, [numOfCartItems, totalCartPrice]);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="pt-30 ">
      <h2 className="text-center mb-15 text-4xl">My Cart</h2>
      <div className="container-fluid flex justify-center items-center mb-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-between items-center mt-5 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Items:{" "}
              <span className="text-gray-900">{numOfCartItems}</span>
            </h3>
            <button
              type="button"
              onClick={() => setOpenForm(true)}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Checkout!
            </button>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Price:{" "}
              <span className="text-green-600">EGP {totalCartPrice}</span>
            </h3>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-16 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:block">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.data.products.map((product) => {
                return (
                  <tr
                    key={product._id}
                    className="bg-white border-b  border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateQuantity(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      EGP {product.price}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span
                        onClick={() => removeItem(product.product.id)}
                        className="font-medium text-red-600  hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => clearCart()}
              type="button"
              className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      {openForm && (
        <>
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white rounded-lg p-4 min-h-96"
            >
              <h2 className="mb-10 px-1">Shipping Address Form</h2>
              <div className="flex flex-col gap-2 ">
                <input
                  {...formik.getFieldProps("details")}
                  type="text"
                  placeholder="details"
                  className="rounded-lg border-gray-300 outline-none mb-5"
                />
                <input
                  {...formik.getFieldProps("phone")}
                  type="tel"
                  placeholder="phone"
                  className="rounded-lg border-gray-300 outline-none mb-5"
                />
                <input
                  {...formik.getFieldProps("city")}
                  type="text"
                  placeholder="city"
                  className="rounded-lg border-gray-300 outline-none mb-5"
                />
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Check Out
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
