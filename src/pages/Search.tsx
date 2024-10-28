import { useState } from "react";
import { useForm } from "react-hook-form";
import { searchTracks } from "../services/spotify";
import { Track } from "../types/spotify";
import TrackCard from "../components/TrackCard";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import Player from "../components/MusicPlayer";

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

  return (
    <div className="min-h-screen bg-gray-900 pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <input
            {...register("query", { required: true })}
            className="w-full p-4 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search for songs, artists, or albums..."
          />
        </form>

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
      </main>
      <Player track={currentTrack} onPlaybackStateChange={setIsPlaying} />
    </div>
  );
};

export default Search;
