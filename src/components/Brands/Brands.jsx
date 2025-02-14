import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getBrands() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };
    const handleOutsideClick = (e) => {
      if (e.target.id === "popup-Popup") {
        closePopup();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const openPopup = (brand) => {
    setSelectedBrand(brand);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <h2 className=" pt-30 text-green-600 text-center uppercase text-4xl ">
        All brands
      </h2>
      {isLoading ? (
        <div className="pt-30 text-6xl text-green-600">
          <Loading />
        </div>
      ) : (
        <div className="container-fluid p-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {brands.map((brand) => (
              <button
                key={brand._id}
                className="h-60 block max-w-sm p-6 bg-white border border-gray-200 rounded-sm shadow-md hover:shadow-green-600"
                onClick={() => openPopup(brand)}
              >
                <img
                  src={brand.image}
                  alt=""
                  className="mt-5 h-30 mx-auto object-cover"
                />
                <p className="text-center mt-10">{brand.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {isPopupOpen && selectedBrand && (
        <div
          id="popup-Popup"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white shadow-sm">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
              onClick={closePopup}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close Popup</span>
            </button>
            <div className="p-4 text-center">
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="mx-auto mb-4 h-30 object-cover"
              />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                {selectedBrand.name}
              </h3>
              <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
