import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  element: JSX.Element;
}

// Componente para proteger rutas
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { token } = useAuth(); // Obtén el token del contexto de autenticación

  // Si no hay token, redirige a la página de inicio de sesión
  if (!token) {
    return <Navigate to="/" />;
  }

  // Si hay token, renderiza el elemento
  return element;
};

export default ProtectedRoute;
