import { useState } from 'react';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

function App() {
  // Cada que queramos agregar un estado nuevo, hacemos | 'estado', ej: | 'register' | 'welcome' cuando agregamos una pagina de bienvenida 
  const [page, setPage] = useState<'login' | 'register'>('login');

  return (
    <div>
      {/* cuando hacemos PRED && <componente>  si PRED es true, react renderiza el componente de la derecha del && */}
      {page === 'login' && <LoginPanel onSwitch={() => setPage('register')} />}
      {page === 'register' && <RegisterPanel 
                              returnToLogin={() => setPage('login')} />}

    </div>
  );
}

export default App;
