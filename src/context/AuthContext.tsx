import { createContext, useState, useEffect, ReactNode } from 'react';

// Define la interfaz para el contexto de autenticación
interface AuthContextType {
  token: string | null; // El token de autenticación o null si no está presente
  setToken: (token: string | null) => void; // Función para actualizar el token
}

// Crea un contexto de autenticación inicializado como null
export const AuthContext = createContext<AuthContextType | null>(null);

// Proveedor de contexto que envuelve a los componentes hijos
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado para almacenar el token, inicializado desde localStorage
  const [token, setToken] = useState<string | null>(localStorage.getItem('spotify_token'));

  // Efecto que se ejecuta cuando el token cambia
  useEffect(() => {
    // Si hay un token, lo guarda en localStorage; si no, lo elimina
    if (token) {
      localStorage.setItem('spotify_token', token);
    } else {
      localStorage.removeItem('spotify_token');
    }
  }, [token]);

  return (
    // Proporciona el token y la función setToken a los componentes hijos
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
