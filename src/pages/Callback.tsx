import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const Callback = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const { setToken } = useAuth(); // Obtiene la función setToken del contexto de autenticación

  useEffect(() => {
    // Este efecto se ejecuta al montar el componente
    const hash = window.location.hash // Obtiene el hash de la URL
      .substring(1) // Elimina el símbolo '#' al principio
      .split('&') // Divide el hash en pares clave-valor
      .reduce<Record<string, string>>((acc, item) => {
        const [key, value] = item.split('='); // Separa cada par clave-valor
        acc[key] = decodeURIComponent(value); // Decodifica el valor y lo agrega al acumulador
        return acc; // Devuelve el acumulador
      }, {});

    // Si el hash contiene un access_token, se configura el token y se navega a la página de búsqueda
    if (hash.access_token) {
      setToken(hash.access_token); // Establece el token de acceso en el contexto
      navigate('/search'); // Navega a la ruta de búsqueda
    }
  }, [navigate, setToken]); // Dependencias del efecto

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-xl">Connecting to Spotify...</div>
    </div>
  );
};

export default Callback;
