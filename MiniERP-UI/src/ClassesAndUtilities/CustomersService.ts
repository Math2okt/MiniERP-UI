import type { Customer } from "../Types/Customer";
import { Requester } from "./Requester";

const requester = new Requester();



export class CustomersService {
    static async listCustomers(): Promise<Customer[]> {
        const response = await requester.get<any>("/sales/customers/");
        if (response.results && Array.isArray(response.results)) {
            return response.results;
        }
        return [];
    }
}
