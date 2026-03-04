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
  howToUse?: string[];
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

export type CMSReason = {
  icon: string;
  title: string;
  text: string;
};

export type CMSCategoryImage = {
  category: string;
  imageUrl: string;
};

export type CMSHairTypeGuide = {
  type: string;
  icon: string;
  description: string;
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
  reasons: CMSReason[];
  categoryImages: CMSCategoryImage[];
  hairTypeGuide: CMSHairTypeGuide[];
};

export type CMSData = {
  settings: CMSSettings;
  products: CMSProduct[];
  videos: CMSVideo[];
  reviews: CMSReview[];
};
