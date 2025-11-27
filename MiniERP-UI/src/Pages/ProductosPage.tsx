import type { User } from "../Types/User";


type ProductosPageProps = {
    currentUser : User | null
}
function ProductosPage({currentUser}:ProductosPageProps) {
    return (
        <div>
            <h1>Bienvenido {currentUser?.full_name} ! </h1>
            <h2>Listado de Productos</h2>
        </div>
    );
}

export default ProductosPage;
