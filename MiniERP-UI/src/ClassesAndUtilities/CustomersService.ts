import type { Customer } from "../Types/Customer";
import { Requester } from "./Requester";
import Utilities from "./Utilities";

const requester = new Requester();

export class CustomersService {
    static async listCustomers(): Promise<Customer[]> {
        const response = await requester.get<any>("/sales/customers/");
        if (response.results && Array.isArray(response.results)) {
            return response.results;
        }
        return [];
    }
    static async deleteCustomer(id: number) {
        try {
            const response = await requester.delete(`/sales/customers/${id}/`)
            if (response) {
                Utilities.throwNotification("Cliente eliminado correctamente", true, 3000)
            } else {
                Utilities.throwNotification("No se elimino el cliente", false, 3000)
            }
        } catch (error) {
            console.log("Error al intentar eliminar customer")
            console.error(error)
        }
    }
    static async updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer> {
        const body = JSON.stringify(customer);
        return await requester.put<Customer>(`/sales/customers/${id}/`, body);
    }

    static async createCustomer(customer: Partial<Customer>): Promise<Customer> {
        const body = JSON.stringify(customer);
        return await requester.post<Customer>(`/sales/customers/`, body);
    }
}
