import { useState } from "react";
import { useForm } from "react-hook-form";
import { Track } from "../types/spotify";
import { useAuth } from "../hooks/useAuth";
import { searchTracks } from "../services/spotify";
import Header from "../components/Header";
import TrackCard from "../components/TrackCard";
import MusicPlayer from "../components/MusicPlayer";

interface SearchForm {
  query: string;
}

const Search = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const { token } = useAuth();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = async (data: SearchForm) => {
    if (token) {
      setLoading(true);
      try {
        const results = await searchTracks(data.query, token);
        setTracks(results);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <main className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-8 md:py-12">
        <div className="mx-auto space-y-12 md:space-y-16">
          {/* Hero Section */}
          <div className="flex flex-col items-center space-y-6 mb-12">
            <div className="bg-blue-50 dark:bg-gray-800/50 p-5 rounded-3xl shadow-lg backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-10 h-10 text-blue-500 dark:text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Discover Your Music
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto px-4">
              Search through millions of tracks to find your next favorite song
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-4xl mx-auto px-4"
          >
            <div className="relative group">
              <input
                {...register("query", { required: true })}
                className="w-full p-6 md:p-7 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-700 
                         text-lg md:text-xl text-gray-800 dark:text-white bg-white dark:bg-gray-800/50 
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                         shadow-sm group-hover:shadow-lg backdrop-blur-sm
                         transition-all duration-300 ease-in-out"
                placeholder="Search for songs, artists, or albums..."
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm md:text-base">
                Press Enter to search
              </div>
            </div>
          </form>

          {/* Results Section */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px] mt-8">
              <div className="text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                Searching for tracks...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-12">
              {tracks.map((track) => (
                <div
                  onClick={() => handleTrackSelect(track)}
                  key={track.id}
                  className="cursor-pointer transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl 
                           transition-all duration-300 ease-in-out rounded-xl overflow-hidden
                           backdrop-blur-sm hover:backdrop-blur-lg"
                >
                  <TrackCard track={track} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedTrack && <MusicPlayer track={selectedTrack} token={token} />}
    </div>
  );
};

export default Search;
