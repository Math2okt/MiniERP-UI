import { useEffect, useState } from "react";
import { ProductsService } from "../ClassesAndUtilities/ProductsService";
import type { Product } from "../ClassesAndUtilities/ProductsService";
import type { User } from "../Types/User";

interface ProductosPageProps {
    currentUser: User | null;
}

export const ProductosPage = ({ currentUser }: ProductosPageProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({});

    const fetchProducts = async () => {
        try {
            const data = await ProductsService.listProducts();
            setProducts(data);
        } catch (err: any) {
            setError(err.message || "Error al cargar productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsCreating(false);
        setFormData({ ...product });
        setShowModal(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setFormData({});
        setIsCreating(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await ProductsService.deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
                alert("Producto eliminado exitosamente");
            } catch (err: any) {
                alert("Error al eliminar producto: " + err.message);
            }
        }
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        try {
            // asegurarnos de que stock sea number
            const payload = { ...formData } as any;
            if (payload.stock_quantity !== undefined) payload.stock_quantity = Number(payload.stock_quantity);
            await ProductsService.updateProduct(editingProduct.id, payload);
            setShowModal(false);
            setEditingProduct(null);
            await fetchProducts();
            alert("Producto actualizado exitosamente");
        } catch (err: any) {
            alert("Error al actualizar producto: " + err.message);
        }
    };

    const handleCreateSave = async () => {
        try {
            const payload = { ...formData } as any;
            if (payload.stock_quantity !== undefined) payload.stock_quantity = Number(payload.stock_quantity);
            // price se envía como string (como estaba antes)
            await ProductsService.createProduct(payload);
            setShowModal(false);
            setIsCreating(false);
            await fetchProducts();
            alert("Producto creado exitosamente");
        } catch (err: any) {
            alert("Error al crear producto: " + err.message);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'stock_quantity' ? (value === '' ? undefined : Number(value)) : value
        }));
    };

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="m-0">Productos</h1>
                <button className="btn btn-success" onClick={handleCreate}>Nuevo Producto</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.stock_quantity}</td>
                            <td>
                                <button 
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEdit(p)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (editingProduct || isCreating) && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isCreating ? 'Crear Producto' : 'Editar Producto'}</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowModal(false)}
                                ></button>
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
                                    <label className="form-label">Precio</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="price"
                                        value={formData.price || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cantidad en Stock</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="stock_quantity"
                                        value={formData.stock_quantity || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => { setShowModal(false); setIsCreating(false); setEditingProduct(null); }}
                                >
                                    Cancelar
                                </button>
                                {isCreating ? (
                                    <button 
                                        type="button" 
                                        className="btn btn-success" 
                                        onClick={handleCreateSave}
                                    >
                                        Crear Producto
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
export default ProductosPage;