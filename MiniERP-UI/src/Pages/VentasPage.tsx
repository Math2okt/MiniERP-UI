import type { User } from "../Types/User";

type VentasPageProps = {
    currentUser:User | null
}
function VentasPage({currentUser}:VentasPageProps) {
    return (
        <div>
            <h1>Ventas</h1>
        </div>
    );
}

export default VentasPage;
