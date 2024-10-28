// Obtiene el CLIENT_ID de Spotify desde las variables de entorno (Vite usa import.meta.env para acceder a ellas).
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

// Define la URI a la que Spotify redirigirá después del inicio de sesión exitoso (también almacenada en las variables de entorno).
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

// Define los permisos (scopes) adicionales que la aplicación solicita del usuario.
const SCOPES = [
  "streaming", // Permite la reproducción en dispositivos compatibles.
  "user-read-email", // Acceso al correo electrónico del usuario.
  "user-read-private", // Acceso a los datos de perfil del usuario.
  "user-library-read", // Permite leer la biblioteca de canciones del usuario.
  "user-library-modify", // Permite modificar la biblioteca de canciones del usuario.
  "user-read-playback-state", // Permite leer el estado de reproducción actual.
  "user-modify-playback-state", // Permite modificar el estado de reproducción (pausar, avanzar, etc.).
  "user-follow-read", // Permite leer a los artistas y usuarios que sigue el usuario.
  "playlist-read-private", // Permite leer las listas de reproducción privadas del usuario.
  "playlist-read-collaborative", // Permite leer las listas de reproducción colaborativas del usuario.
  "playlist-modify-public", // Permite crear y modificar listas de reproducción públicas.
  "playlist-modify-private", // Permite crear y modificar listas de reproducción privadas.
  "user-top-read", // Permite acceder a los artistas y canciones más escuchados por el usuario.
];

// Esta función genera la URL de inicio de sesión en Spotify con todos los parámetros necesarios.
// Redirige al usuario a la página de autorización de Spotify.
export const getSpotifyLoginUrl = () => {
  return (
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "token", // Solicita un token de acceso en la URL de retorno.
      client_id: CLIENT_ID, // ID del cliente registrado en Spotify (obligatorio para la autenticación).
      scope: SCOPES.join(" "), // Convierte los permisos en una cadena de texto separada por espacios.
      redirect_uri: REDIRECT_URI, // Define la URL a la que Spotify redirigirá después del inicio de sesión.
      show_dialog: "true", // Fuerza la muestra del diálogo de inicio de sesión, incluso si el usuario ya inició sesión.
    }).toString()
  ); // Convierte los parámetros en una cadena de consulta para añadirla a la URL.
};
