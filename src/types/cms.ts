export type CMSProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  hairType: string;
  brand: string;
  benefit: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  tags: string[];
};

export type CMSVideo = {
  id: string;
  title: string;
  url: string;
  description: string;
};

export type CMSReview = {
  id: string;
  author: string;
  text: string;
  rating: number;
  productSlug?: string;
};

export type CMSSettings = {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappUrl: string;
  instagramUrl: string;
  supportText: string;
  trustItems: string[];
  paymentItems: string[];
};

export type CMSData = {
  settings: CMSSettings;
  products: CMSProduct[];
  videos: CMSVideo[];
  reviews: CMSReview[];
};
