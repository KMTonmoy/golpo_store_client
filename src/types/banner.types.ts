export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  mobileImage: string;
}

export interface CarouselSettings {
  autoplay: boolean;
  autoplaySpeed: number;
  pauseOnHover: boolean;
  showDots: boolean;
  showArrows: boolean;
  infinite: boolean;
  speed: number;
}

export interface BannerDataResponse {
  banners: Banner[];
  settings: CarouselSettings;
}
