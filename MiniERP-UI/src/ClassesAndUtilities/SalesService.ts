import { Requester } from "./Requester";

const requester = new Requester();

export interface OrderItem {
    product: number;
    quantity: number;
    unit_price: string;
}

export interface Order {
    id: number;
    customer_id: number;
    order_date: string;
    delivery_date: string;
    notes: string;
    items: OrderItem[];
}

export class SalesService {
    static async listOrders(): Promise<Order[]> {
        const response = await requester.get<any>("/sales/orders/");
        if (response.results && Array.isArray(response.results)) {
            return response.results;
        }
        return [];
    }
}
