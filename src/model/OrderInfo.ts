export interface OrderInfo {
    id: number;
    orderDate: string;
    orderNumber: string;
    subTotal: number;
    totalPrice: number
    products: {
        id: number;
        productName: string;
        quantity: number;
        subTotal: number;
    }[];
}