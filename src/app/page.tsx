import BannerCarousel from "@/components/Banner/BannerCarousel";

const page = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4  mt-5">
        <div className="flex flex-col gap-10">
          <BannerCarousel/>
          <h1 className="  text-2xl font-semibold text-gray-800">Hello World</h1>
        </div>
      </div>
    </div>
  );
};

export default page;