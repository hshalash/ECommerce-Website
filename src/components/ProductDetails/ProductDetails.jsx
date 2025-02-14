import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import Slider from "react-slick";

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1,  
  };

  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();

  function getProductData(id) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data.data);
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getProductData(id);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="pt-60 text-6xl text-green-600">
          <Loading />
        </div>
      ) : (
        <div className="container mt-25 mx-20">
          <div className="row">
            <div className="w-1/4">
              <Slider {...settings}>
                {productDetails?.images.map((src) => 
                  <img key={productDetails?.id} className="" src={src} alt={productDetails?.title} />
                )}
              </Slider>
            </div>
            <div className="w-3/4 p-6 flex justify-between items-center relative">
              <div>
                <h2 className="text-2xl font-bold text-6xl">{productDetails?.title}</h2>
                <p className=" mt-2">{productDetails?.description}</p>
                <p className=" mt-2 font-semibold">
                  EGP {productDetails?.price}
                </p>
                <div className="mt-3">
                  <FaStar className="inline-block text-yellow-300" />{" "}
                  {productDetails?.ratingsAverage}
                </div>
                <button type="button" className="w-full btn-green mt-7">
                  Add Product
                </button>
              </div>
              <div className="">
                <div className="text-lg hover:text-red-600 absolute top-2 right-2 text-gray-500 cursor-pointer">
                  <FaHeart />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
