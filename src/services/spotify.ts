import { SearchResponse, Track } from "../types/spotify";

// Definimos la URL base de la API de Spotify
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

// Función asíncrona para buscar pistas en Spotify
// La función toma dos parámetros: 'query' (una cadena que representa la consulta de búsqueda)
// y 'token' (una cadena que representa el token de autorización de la API de Spotify).
export const searchTracks = async (query: string, token: string): Promise<Track[]> => {
  try {
    // Realizamos una solicitud a la API de Spotify usando la función fetch
    const response = await fetch(
      // Construimos la URL de búsqueda con la consulta y tipo de búsqueda
      // La consulta se codifica para asegurarnos de que se manejen correctamente caracteres especiales
      `${SPOTIFY_BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          // Añadimos el encabezado de autorización con el token proporcionado
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Convertimos la respuesta de la API a JSON
    const data: SearchResponse = await response.json();

    // Retornamos la lista de pistas encontradas
    // Accedemos a 'tracks.items' que contiene las pistas devueltas por la API
    return data.tracks.items; // Devuelve un arreglo de objetos 'Track'
  } catch (error) {
    // En caso de error (como problemas de red o errores en la respuesta)
    console.error('Error searching tracks:', error);
    // Retornamos un arreglo vacío en caso de error
    return [];
  }
};
