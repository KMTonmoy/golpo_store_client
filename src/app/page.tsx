import BannerCarousel from "@/components/Home/Banner/BannerCarousel";
import BrandShowcase from "@/components/Home/BrandShowcase/BrandShowcase";
import ContactSection from "@/components/Home/ContactInfo/ContactSection";
import FlashSale from "@/components/Home/FlashSale/FlashSale";
import ProductGridContainer from "@/components/Home/FeaturedProduct/ProductGridContainer";

const page = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4  mt-5">
        <div className="flex flex-col gap-10">
          <BannerCarousel />
          <FlashSale />
          <ProductGridContainer
            title="Latest Products"
            type="latest"
            limit={16}
            columns={4}
            sortBy="newest"
          />
          <BrandShowcase />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default page;
