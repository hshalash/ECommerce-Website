import Products from "../Products/Products";
import CatSlider from "../CatSlider/CatSlider";

export default function Home() {
  return (
    <>
      <div className="mt-35">
        <CatSlider />
        <Products />
      </div>
    </>
  );
}
