import { useEffect, useState } from "react";
import { CustomersService } from "../ClassesAndUtilities/CustomersService";


import type { Customer } from "../Types/Customer";
import Utilities from "../ClassesAndUtilities/Utilities";


export const ClientesPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState<Partial<Customer>>({});
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
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
    useEffect(() => {
        fetchCustomers();
    }, []);

    function handleCreate() {
        setShowModal(true)
        setIsCreating(true)
        setEditingCustomer(null);
        setFormData({});
    }
    async function handleDelete(id: number) {
        if (confirm("¿Estás seguro de que deseas eliminar este Cliente?")) {
            try {
                await CustomersService.deleteCustomer(id);
                setCustomers(customers.filter(p => p.id !== id));
                Utilities.throwNotification("Cliente eliminado correctamente", true, 2000)
            } catch (err: any) {
                Utilities.throwNotification("Error al eliminar producto: " + err.message, false, 5000);
            }
        }
    }
    function handleEdit(customer: Customer) {
        setEditingCustomer(customer)
        setShowModal(true)
        setFormData({ ...customer })
        setIsCreating(false)
    }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    async function handleCreateSave() {
        try {
            const newCustomer = { ...formData } as any
            await CustomersService.createCustomer(newCustomer)
            setShowModal(false);
            setIsCreating(false);
            Utilities.throwNotification("Cliente creado correctamente", true, 2000)
            await fetchCustomers()
        } catch (error) {
            Utilities.throwNotification("Algo salio mal al intentar crear el cliente", false, 4000)

            console.error("Error creando cliente " + error)
        }
    }
    async function handleSaveEdit() {
        try {
            const changes = { ...formData } as any
            await CustomersService.updateCustomer(editingCustomer!.id, changes)
            setShowModal(false)
            setEditingCustomer(null)
            Utilities.throwNotification("Cliente editado exitosamente", true, 2000)
            await fetchCustomers()
        } catch (error) {
            Utilities.throwNotification("Algo salio mal intentando editar el cliente", false, 4000)
            console.error(error)
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-lilaClaro text-black font-arimo text-xl">Cargando Clientes...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-lilaClaro text-black font-arimo text-xl">Error: {error}</div>;
    return (
        <div className="min-h-screen bg-lilaClaro px-8 py-6">
            <div className="flex justify-between items-center mb-6 w-full max-w-6xl mx-auto">
            <h1 className="text-4xl m-0 font-arimo font-bold">Clientes</h1>
            <button
                className="px-4 py-2 rounded-lg font-semibold bg-celeste hover:bg-lavanda text-black"
                onClick={handleCreate}
            >
                Nuevo Cliente
            </button>
            </div>


            <div className="rounded-xl shadow-xl overflow-hidden w-full max-w-6xl mx-auto">
            <table className="w-full">
                <thead className="bg-menta text-black font-bold">
                <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Nombre</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Teléfono</th>
                    <th className="py-3 px-4 text-left">Dirección</th>
                    <th className="py-3 px-4 text-left">Activo</th>
                    <th className="py-3 px-4 text-left">Órdenes</th>
                    <th className="py-3 px-4 text-left">Creado</th>
                    <th className="py-3 px-4 text-left">Acciones</th>
                </tr>
                </thead>

                <tbody className="bg-mentaClaro">
                {customers.map(c => (
                    <tr key={c.id} className="bg-mentaClaro border-b border-menta">
                    <td className="py-3 px-4">{c.id}</td>
                    <td className="py-3 px-4">{c.name}</td>
                    <td className="py-3 px-4">{c.email}</td>
                    <td className="py-3 px-4">{c.phone}</td>
                    <td className="py-3 px-4">{c.address}</td>
                    <td className="py-3 px-4">{c.is_active ? "Sí" : "No"}</td>
                    <td className="py-3 px-4">{c.orders_count}</td>
                    <td className="py-3 px-4">{c.created_at}</td>
                    <td className="py-3 px-4">
                        <button
                        className="px-3 py-1 rounded bg-lila text-black font-medium hover:bg-lila/80 transition mr-2"
                        onClick={() => handleEdit(c)}
                        >
                        Editar
                        </button>
                        <button
                        className="px-3 py-1 rounded bg-red-400 text-white font-medium hover:bg-red-500 transition"
                        onClick={() => handleDelete(c.id)}
                        >
                        Eliminar
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            
            {showModal && (editingCustomer || isCreating) && (

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {isCreating ? "Crear Cliente" : "Editar Cliente"}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.name || ""}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.email || ""}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.phone || ""}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.address || ""}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                                onClick={() => {
                                    setShowModal(false);
                                    setIsCreating(false);
                                    setEditingCustomer(null);
                                }}
                            >
                                Cancelar
                            </button>

                            {isCreating ? (
                                <button
                                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                                    onClick={handleCreateSave}
                                >
                                    Crear Cliente
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                                    onClick={handleSaveEdit}
                                >
                                    Guardar Cambios
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
export default ClientesPage;