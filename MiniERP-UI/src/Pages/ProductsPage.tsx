import { useEffect, useState } from "react";
import { ProductsService } from "../ClassesAndUtilities/ProductsService";
import type { Product } from "../Types/Product";
import Utilities from "../ClassesAndUtilities/Utilities";


export const ProductosPage = () => {
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
                Utilities.throwNotification("Producto eliminado exitosamente",true,3000);
            } catch (err: any) {
                Utilities.throwNotification("Error al eliminar producto",false,4000);
                console.error(err)
            }
        }
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        try {
            const payload = { ...formData } as any;
            if (payload.stock_quantity !== undefined) payload.stock_quantity = Number(payload.stock_quantity);
            await ProductsService.updateProduct(editingProduct.id, payload);
            setShowModal(false);
            setEditingProduct(null);
            await fetchProducts();
            Utilities.throwNotification("Producto actualizado exitosamente",true,2000);
        } catch (err: any) {
            Utilities.throwNotification("Error al actualizar producto",false,4000);
            console.error(err)
        }
    };

    const handleCreateSave = async () => {
        try {
            const payload = { ...formData } as any;
            if (payload.stock_quantity !== undefined) payload.stock_quantity = Number(payload.stock_quantity);
            await ProductsService.createProduct(payload);
            setShowModal(false);
            setIsCreating(false);
            await fetchProducts();
            Utilities.throwNotification("Producto creado exitosamente",true,3000);
        } catch (err: any) {
            Utilities.throwNotification("Error al crear producto",false,4000);
            console.error(error)
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'stock_quantity' ? (value === '' ? undefined : Number(value)) : value
        }));
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-lilaClaro text-black font-arimo text-xl">Cargando productos...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-lilaClaro text-black font-arimo text-xl">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-lilaClaro px-8 py-6">
            <div className="flex justify-between items-center mb-6 w-full max-w-6xl mx-auto">
                <h1 className=" text-4xl m-0 font-arimo font-bold">Productos</h1>
                <button className="px-4 py-2 rounded-lg font-semibold bg-celeste hover:bg-lavanda text-black" onClick={handleCreate}>Nuevo Producto</button>
            </div>
            <div className="rounded-xl shadow-xl overflow-hidden w-full max-w-6xl mx-auto">
                <table className="w-full">
                    <thead className="bg-menta text-black font-bold">
                        <tr>
                            <th className="py-3 px-4 text-left">Nombre</th>
                            <th className="py-3 px-4 text-left">Precio</th>
                            <th className="py-3 px-4 text-left">Stock</th>
                            <th className="py-3 px-4 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-mentaClaro">
                        {products.map(p => (
                            <tr key={p.id} className="bg-mentaClaro border-b border-menta">
                                <td className="py-3 px-4">{p.name}</td>
                                <td className="py-3 px-4">${p.price}</td>
                                <td className="py-3 px-4">{p.stock_quantity}</td>
                                <td>
                                    <button 
                                        className="px-3 py-1 rounded bg-lila text-black font-medium hover:bg-lila/80 transition mr-2"
                                        onClick={() => handleEdit(p)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="px-3 py-1 rounded bg-red-400 text-white font-medium hover:bg-red-500 transition"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (editingProduct || isCreating) && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-xl font-arimo font-bold">
                        {isCreating ? 'Crear Producto' : 'Editar Producto'}
                        </h5>
                        <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                        onClick={() => { setShowModal(false); setIsCreating(false); setEditingProduct(null); }}
                        >
                        ×
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                        <label className="block mb-1 font-medium">Nombre</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-menta"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleFormChange}
                        />
                        </div>

                        <div>
                        <label className="block mb-1 font-medium">Precio</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-menta"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleFormChange}
                        />
                        </div>

                        <div>
                        <label className="block mb-1 font-medium">Cantidad en Stock</label>
                        <input
                            type="number"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-menta"
                            name="stock_quantity"
                            value={formData.stock_quantity || ''}
                            onChange={handleFormChange}
                        />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
                        onClick={() => { setShowModal(false); setIsCreating(false); setEditingProduct(null); }}
                        >
                        Cancelar
                        </button>

                        {isCreating ? (
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg bg-menta hover:bg-mentaClaro text-black font-semibold"
                            onClick={handleCreateSave}
                        >
                            Crear Producto
                        </button>
                        ) : (
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg bg-lila hover:bg-lila/80 text-black font-semibold"
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
export default ProductosPage;