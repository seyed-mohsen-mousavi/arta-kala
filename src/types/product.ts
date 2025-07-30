export default interface ProductType {
  id: number;
  name: string;
  price: number;
  cover_image: string;
  description_1: string;
  description_2: string;
  category: string;
  stock: number;
  discountPercent?: number;
  slug: string;
  pdfs?: string[];
  images: string[];
  is_available: boolean;
  discount_percentage?: number;
  final_price?: number;
  isDiscounted?: boolean;
}
