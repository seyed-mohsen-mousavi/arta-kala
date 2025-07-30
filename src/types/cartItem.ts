export type CartItem = {
    id: number;
    product_id: number;
    product_name: string;
    product_cover_image: string;
    unit_price: number;
    quantity: number;
    total_price: number;
    stock: number;
    final_price?: number
    isDiscounted?: boolean
}
