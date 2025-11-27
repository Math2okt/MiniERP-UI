type UserFormProps = {
    username: string;
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
//onChange={(e)=>props.setUsername(e.target.value)} /> cada que el input cambia, este cambia el estado
function UserForm(props: UserFormProps) {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <label htmlFor="username">Tu Username</label>
                <input id="username" name="username" 
                type="text"
                value={props.username}
                onChange={(e)=>props.setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" name="email" type="email"
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)} />
            </div>

            <div>
                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password"
                    type="password"
                    value={props.password}
                    onChange={(e) => props.setPassword(e.target.value)} />
            </div>

            <button type="submit">Registrarse</button>
        </form>
    )
}

export default UserForm;