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

    if (loading) return <div>Cargando Clientes...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h1>Clientes del Sistema</h1>
            <button className="btn btn-success" onClick={handleCreate}>Nuevo Cliente</button>
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
                        <th>Acciones</th>
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
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEdit(c)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(c.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (editingCustomer || isCreating) && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isCreating ? 'Crear Cliente' : 'Editar Cliente'}</h5>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telefono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Direccion</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setShowModal(false); setIsCreating(false); setEditingCustomer(null); }}
                                >
                                    Cancelar
                                </button>
                                {isCreating ? (
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleCreateSave}
                                    >
                                        Crear Cliente
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSaveEdit}
                                    >
                                        Guardar Cambios
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ClientesPage;