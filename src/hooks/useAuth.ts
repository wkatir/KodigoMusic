import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación desde AuthProvider

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  // Obtiene el contexto de autenticación
  const context = useContext(AuthContext);
  
  // Lanza un error si se intenta usar useAuth fuera de un AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Devuelve el contexto de autenticación, que contiene el token y setToken
  return context; 
};
