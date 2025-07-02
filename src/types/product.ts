export default interface ProductType {
  id: number;
  name: string;
  currentPrice: number;
  originalPrice?: number;
  images: string[];
}
