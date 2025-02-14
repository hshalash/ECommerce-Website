import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCategories() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      ;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories()
  },[]);

  return (
    <>
      <h2 className=" pt-32 text-green-600 text-center uppercase text-4xl ">
        All Categories
      </h2>
      {isLoading ? (
        <div className="pt-30 text-6xl text-green-600">
        <Loading />
      </div>
      ) : (
        <div className="container-fluid p-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {categories.map((category) => (
              <button
                key={category._id}
                className="h-60 block max-w-sm p-2 bg-white border border-gray-200 rounded-sm shadow-md hover:shadow-green-600"
              >
                <img
                  src={category.image}
                  alt=""
                  className="mt-5 h-40 mx-auto object-cover"
                />
                <p className="text-center mt-5">{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
