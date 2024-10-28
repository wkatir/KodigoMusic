import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import Callback from './pages/Callback'; 
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

const App = () => {
   // Crea el enrutador con las rutas definidas
   const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />, // Ruta para la página de inicio de sesión
    },
    {
      path: '/callback',
      element: <Callback />, // Ruta para la página de callback
    },
    {
      path: '/search',
      element: <ProtectedRoute element={<Search />} />, // Ruta protegida para la página de búsqueda
    },
    {
      path: '*', // Ruta para manejar todas las rutas no encontradas
      element: <NotFound />, // Renderiza el componente NotFound para rutas no definidas
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} /> 
    </AuthProvider>
  );
}

export default App;
