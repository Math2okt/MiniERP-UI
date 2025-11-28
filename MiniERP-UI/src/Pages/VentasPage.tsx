import { useEffect, useState } from "react";
import { SalesService } from "../ClassesAndUtilities/SalesService";
import type { Order } from "../ClassesAndUtilities/SalesService";
import type { User } from "../Types/User";

interface VentasPageProps {
    currentUser: User | null;
}

export const VentasPage = ({ currentUser }: VentasPageProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await SalesService.listOrders();
                setOrders(data);
            } catch (err: any) {
                setError(err.message || "Error al cargar órdenes");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Cargando órdenes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Órdenes de Venta</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Cliente</th>
                        <th>Fecha de Orden</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.customer_id}</td>
                            <td>{o.order_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default VentasPage;