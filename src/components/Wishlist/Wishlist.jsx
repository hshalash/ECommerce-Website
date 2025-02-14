import { useContext } from "react";
import { WishContext } from "../../Context/WishContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { TiDeleteOutline } from "react-icons/ti";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist() {
  let { getWishlist, removeItemFromWishlist } = useContext(WishContext);
  let { addToCart } = useContext(CartContext);
  async function addProduct(productId) {
    try {
      let response = await addToCart(productId);
      if (response?.status == "success") {
        console.log("added");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveItemFromWishlist(productId) {
    try {
      let response = await removeItemFromWishlist(productId);
      if (response?.status === 200) {
        console.log("removed");
        getWishlist();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const {
    data: wishlistItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      let response = await getWishlist();
      if (response?.status !== 200) {
        throw new Error("Failed to fetch wishlsit");
      }
      return response.data;
    },
    staleTime: 8000,
  });

  return (
    <>
      <div className="pt-30">
        <h2 className="text-center mb-15 text-4xl">My Wishlist</h2>

        {/* Show Loading */}
        {isLoading && (
          <div className=" text-6xl text-green-600">
            <Loading />
          </div>
        )}

        {/* Show Error */}
        {isError && (
          <p className="text-center text-red-500">Error: {error.message}</p>
        )}

        {/* Show Wishlist */}
        {!isLoading && !isError && wishlistItems?.count > 0 ? (
          <div className="container-fluid flex justify-center items-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center"></th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems?.data?.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={item.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={item.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        EGP {item.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-600 hover:underline uppercase">
                          <button
                            type="button"
                            onClick={() => addProduct(item.id)}
                            className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                          >
                            Add to Cart
                          </button>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-2xl text-red-600 cursor-pointer"
                          onClick={() => {
                            handleRemoveItemFromWishlist(item._id);
                            removeItemFromWishlist(item._id);
                          }}
                        >
                          <TiDeleteOutline />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-gray-500">Your wishlist is empty.</p>
          )
        )}
      </div>
    </>
  );
}
