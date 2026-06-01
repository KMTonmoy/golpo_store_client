export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  buttonLink: string;
  badge: string;
  features: string[];
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
