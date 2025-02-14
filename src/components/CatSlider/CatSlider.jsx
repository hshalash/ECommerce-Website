import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CatSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  async function getCat() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCat();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {categories?.map((cat) => (
          <div key={cat?._id}>
            <img
              className="w-50 h-50 object-cover"
              src={cat?.image}
              alt={cat?.name}
            />{" "}
            <h6 className="text-center">{cat?.name}</h6>
          </div>
        ))}
      </Slider>
    </>
  );
}
