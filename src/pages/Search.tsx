import { useState } from "react";
import { useForm } from "react-hook-form";
import { Track } from "../types/spotify";
import { useAuth } from "../hooks/useAuth";
import { searchTracks } from "../services/spotify";
import Header from "../components/Header";
import TrackCard from "../components/TrackCard";

interface SearchForm {
  query: string;
}

const Search = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const { token } = useAuth();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = async (data: SearchForm) => {
    if (token) {
      setLoading(true); // Establece el estado de carga en verdadero
      try {
        const results = await searchTracks(data.query, token);
        setTracks(results); // Establece los resultados de la búsqueda
      } catch (error) {
        console.error("Error fetching tracks:", error); // Manejo de errores
      } finally {
        setLoading(false); // Restablece el estado de carga
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-12">
          <input
            {...register("query", { required: true })}
            className="w-full p-4 rounded-xl backdrop-blur-md bg-white/5 text-white placeholder-gray-400 border border-white/10
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10
                     transition-all duration-300"
            placeholder="Search for songs, artists, or albums..."
          />
        </form>
        {loading ? ( // Muestra un mensaje de carga si está buscando
          <p className="text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
