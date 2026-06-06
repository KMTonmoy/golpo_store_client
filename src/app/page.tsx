import BannerCarousel from "@/components/Home/Banner/BannerCarousel";
import FlashSale from "@/components/Home/FlashSale/FlashSale";
import ProductGrid from "@/components/Home/ProductGrid/ProductGrid";

const page = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4  mt-5">
        <div className="flex flex-col gap-10">
          <BannerCarousel />
          <FlashSale />
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default page;
