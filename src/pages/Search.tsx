import { useState } from "react";
import { useForm } from "react-hook-form";
import { searchTracks } from "../services/spotify";
import { Track } from "../types/spotify";
import TrackCard from "../components/TrackCard";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import Player from "../components/MusicPlayer";
import { Search as SearchIcon, MusicIcon } from "lucide-react";

interface SearchForm {
  query: string;
}

const Search = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { token } = useAuth();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = async (data: SearchForm) => {
    if (token) {
      const results = await searchTracks(data.query, token);
      setTracks(results);
    }
  };

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
  };

  const handlePlaybackStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Discover Your Music
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <input
              {...register("query", { required: true })}
              className="w-full p-4 pl-12 rounded-xl bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm placeholder-gray-400"
              placeholder="Search for songs, artists, or albums..."
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </form>
        </div>

        {tracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <MusicIcon className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg">Start searching to discover amazing music</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={handlePlay}
                isPlaying={isPlaying && currentTrack?.id === track.id}
                isCurrentTrack={currentTrack?.id === track.id}
              />
            ))}
          </div>
        )}
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-black/50">
        <Player 
          track={currentTrack} 
          onPlaybackStateChange={handlePlaybackStateChange}
          onError={(error) => console.error(error)} 
        />
      </div>
    </div>
  );
};

export default Search;