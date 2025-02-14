import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaStar, FaHeart } from "react-icons/fa";
import Search from "../Search/Search";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { WishContext } from "../../Context/WishContext";
import { toast } from "react-toastify";

export default function Products() {
  let { addToCart } = useContext(CartContext);
  let { addToWishlist } = useContext(WishContext);  

  async function addProduct(productId) {
    try {
      let response = await addToCart(productId);
      if (response?.status == "success") {
        console.log("added");
        toast.success("Item added to cart!");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function wishlist(productId) {
    try {
      let response = await addToWishlist(productId);
      if (response?.status === 200) {
        console.log("added");
        toast.success("Item added to wishlist!");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }




  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 8000,
  });

  console.log(data);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="mt-34">
      <div>
        {/* ----------- SEARCH FORM ----------- */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* ----------- LOADING SPINNER ----------- */}

        {isLoading ? (
          <div className="pt-30 text-6xl text-green-600">
            <Loading />
          </div>
        ) : filteredProducts.length > 0 ? (
          // {/* ----------- PRODUCT CARDS ----------- */}
          <div className="container-fluid p-20 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {filteredProducts.map((product) => (
                <div key={product._id} className="overflow-hidden group relative">
                  <Link
                    to={`/ProductDetails/${product._id}`}
                    className=" h-100 block max-w-sm py-1 px-2 bg-white border border-gray-200 rounded-sm shadow-md hover:shadow-green-600"
                  >
                    <img
                      src={product.imageCover}
                      alt=""
                      className="mb-1 h-70 mx-auto object-cover"
                    />
                    <div className="flex flex-row flex-wrap justify-between">
                      <p className="mt text-green-700 text-left text-sm ">
                        {product.category.name}
                      </p>
                      <p className=" font-bold ">EGP {product.price}</p>
                    </div>

                    <div className="flex flex-row flex-wrap justify-between">
                      <p className="text-lg  ">
                        {product.title.length > 20
                          ? product.title.slice(0, 20) + "..."
                          : product.title}
                      </p>

                      <div>
                        <FaStar className="inline-block text-yellow-300" />{" "}
                        {product.ratingsAverage}
                      </div>
                    </div>
                  </Link>
                  <div
                    onClick={() => wishlist(product._id)}
                    className="text-lg hover:text-red-600 absolute top-2 right-2 text-gray-500 cursor-pointer"
                  >
                    <FaHeart />
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => addProduct(product._id)}
                      type="button"
                      className="group-hover:-translate-y-12  transition-all duration-300 transition-discrete ease-in-out btn-green mb-7 translate-y-25"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // {/* ----------- SEARCH MESSAGE = (NO PRODS FOUND) ----------- */}
          <p className="text-center text-gray-500 col-span-full mt-20 text-lg">
            No products found &#128532;
          </p>
        )}
      </div>
    </div>
  );
}
