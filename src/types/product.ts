export interface ColorOption {
  name: string;
  class: string;
  selectedClass: string;
}

export interface SizeOption {
  name: string;
  inStock: boolean;
}

export interface ProductImage {
  id: number;
  name: string;
  src: string;
  alt: string;
}

export interface Review {
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  details: string[];
  images: ProductImage[];
  reviews?: Review[];
}

export type ExpandableSection = 'description' | 'shipping' | 'reviews' | null;