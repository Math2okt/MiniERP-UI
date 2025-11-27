
import '../App.css'
type LoginPanelProps = {
    onSwitch: () => void;
};
function LoginPanel(props: LoginPanelProps) {

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Lógica de login aquí
        console.log("Hola me estoy logeando")
    }

    return (
        <div>
            <h1>Iniciar sesión</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" name="email" type="email" />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" name="password" type="password" />
                </div>

                <button type="submit">Entrar</button>
            </form>
            {/* Aqui, el onswitch se dispara al clickear neuva cuenta,
             lo que hace que vayamos a la pag para crear una cuenta nueva ,
              hacemos prevent default para que no nos recargue la pagina*/}
            <a href="#" onClick={(e) => { e.preventDefault(); props.onSwitch(); }}>
                Crear nueva cuenta
            </a>

        </div>
    )
}

export default LoginPanel
