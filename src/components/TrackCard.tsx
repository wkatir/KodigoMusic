import { Track } from '../types/spotify';

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  return (
    <div className="group relative backdrop-blur-md bg-gray-900/30 p-4 rounded-xl border border-white/10 hover:bg-gray-800/40 transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={track.album.images[0]?.url} 
          alt={track.name}
          className="w-full h-48 object-cover rounded-lg shadow-lg mb-4 group-hover:shadow-purple-500/20"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="space-y-1">
        <h3 className="text-white font-bold truncate text-lg">{track.name}</h3>
        <p className="text-gray-400 truncate text-sm group-hover:text-purple-400 transition-colors">
          {track.artists[0].name}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;