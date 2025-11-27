import UserForm from "./UserForm";
import { useState } from "react";


type RegisterPanelProps = {
    returnToLogin: () => void;
};

function RegisterPanel(props: RegisterPanelProps) {
    //Usamos estados para que el componente padre(register panel) tenga acceso a las variables del form de UserForm y asi el handleRegister tiene acceso a las variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState('');

    //Se ejecuta cuando se dispara el submit del form
    function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //Aca voy a poner la logica para crear un usuario en el mini erp
        console.log("HOla me estoy registrando ")
    }

    return (
        <div>
            <h1>Registro de usuario</h1>
            <UserForm
                email={email}
                username={userName}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                setUsername={setUsername}
                onSubmit={handleRegister} 
                />

            <button type="button" onClick={props.returnToLogin}>
                Volver al login
            </button>
        </div>
    );
}

export default RegisterPanel;
