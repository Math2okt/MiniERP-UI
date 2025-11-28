import { Requester } from "./Requester";
import Utilities from "./Utilities";

const requester = new Requester();

export interface Product {
    id: number;
    name: string;
    category: number;
    price: string;
    cost_price: string;
    stock_quantity: number;
    min_stock_level: number;
    max_stock_level: number;
}

export class ProductsService {
    static async listProducts(): Promise<Product[]> {
        const response = await requester.get<any>("/inventory/products/");
        if (response.results && Array.isArray(response.results)) {
            return response.results;
        }
        return [];
    }

    static async lowStock(): Promise<Product[]> {
        const response = await requester.get<any>("/inventory/products/low_stock/");

        if (Array.isArray(response)) {
            return response;
        }

        if (response.results && Array.isArray(response.results)) {
            return response.results;
        }

        return [];
    }

    static async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
        const body = JSON.stringify(product);
        return await requester.put<Product>(`/inventory/products/${id}/`, body);
    }

    static async createProduct(product: Partial<Product>): Promise<Product> {
        const body = JSON.stringify(product);
        return await requester.post<Product>(`/inventory/products/`, body);
    }

static async deleteProduct(id: number): Promise<void> {
    try {
        const success = await requester.delete(`/inventory/products/${id}/`);
        if (success) {
            Utilities.throwNotification("Producto eliminado correctamente", true, 3000);
        } else {
            Utilities.throwNotification("Error al eliminar el producto", false, 3000);
        }
    } catch (error) {
        console.error(error);
        Utilities.throwNotification("Error al eliminar el producto", false, 3000);
    }
}

}
