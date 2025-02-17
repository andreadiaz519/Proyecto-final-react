// src/contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  // ✅ Guardamos el objeto completo para usar uid después
        console.log(" Usuario autenticado:", user);
      } else {
        setUser(null);
        console.log(" No hay usuario autenticado");
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);  
      console.log(" Usuario logueado:", userCredential.user);
    } catch (error) {
      console.error(" Error al iniciar sesión:", error.code, error.message);
    }
  };

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);  
      console.log(" Usuario registrado:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error(" Error al registrar usuario:", error.code, error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "Cierre de sesión exitoso",
        status: "info",
        isClosable: true,
        duration: 3000,
      });
      console.log("Usuario desconectado");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
