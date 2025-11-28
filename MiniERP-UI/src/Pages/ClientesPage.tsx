import { useEffect, useState } from "react";
import { CustomersService } from "../ClassesAndUtilities/CustomersService";

import type { User } from "../Types/User";
import type { Customer } from "../Types/Customer";

interface VentasPageProps {
    currentUser: User | null;
}

export const ClientesPage = ({ currentUser }: VentasPageProps) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await CustomersService.listCustomers();
                setCustomers(data);
            } catch (err: any) {
                setError(err.message || "Error al cargar órdenes");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) return <div>Cargando órdenes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Clientes del Sistema</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Activo</th>
                        <th>Órdenes</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>{c.address}</td>
                            <td>{c.is_active ? "Sí" : "No"}</td>
                            <td>{c.orders_count}</td>
                            <td>{c.created_at}</td>
                            <td>{c.updated_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};
export default ClientesPage;