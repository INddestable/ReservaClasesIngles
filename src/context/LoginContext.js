import { createContext, useState, useContext } from 'react';

//Inicializamos el contexto
const LoginContext = createContext();

// Creamos el proveedor
export function LoginProvider({ children }) {
  //variable booleana global
  const [isLogged, setIsLogged] = useState(false);

  //función para alternar o cambiar el booleano
  const toggleLogin = () => setIsLogged((prev) => !prev);

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, toggleLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

//Custom Hook
export function useLogin() {
  return useContext(LoginContext);
}