import { Requester } from "./Requester";

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
        const response = await fetch(`https://minierp.rbnetto.dev/api/inventory/products/${id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + new Requester().getLocalSTToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar producto: ${response.status} ${response.statusText}`);
        }
    }
}
