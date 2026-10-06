import { createContext, useState, useContext, useEffect } from 'react';

//Inicializamos el contexto
const LoginContext = createContext();

// Creamos el proveedor
export function LoginProvider({ children }) {
  //variable booleana global
  const [isLogged, setIsLogged] = useState(false);

  //registrar usuario
  const [registeredUser, setRegisterUser] = useState(null)
  //viariable donde se guarda en estos momentos los datos del usuario
  const [user, setUser] = useState(null)

  //funcion para registrarse
  const register = (userData) => {
    setUser(userData);
    //setRegisterUser(userData);
    setIsLogged(true);
  }

    //Testeo, falta de confianza hacia react :3
    /*
    useEffect(() => {
      console.log("USER CAMBIÓ:", user);
    }, [user]);
    useEffect(() => {
      console.log("REGISTERED USER CAMBIÓ:", registeredUser);
    }, [registeredUser]);
    */

  //funcion para Loguearse
  const login = (userData) => {
    setUser(userData);
    setIsLogged(true);
  }

  //funcion cerrar sesion
  const logout = () => {
    //setUser(null);
    setIsLogged(false);
  }

  //función para alternar o cambiar el booleano
  const toggleLogin = () => setIsLogged((prev) => !prev);

  return (
    <LoginContext.Provider value={{ register, isLogged, setIsLogged, toggleLogin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

//Custom Hook
export function useLogin() {
  return useContext(LoginContext);
}