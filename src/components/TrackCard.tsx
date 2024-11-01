import { Track } from "../types/spotify";
import { Play, Pause } from "lucide-react";

interface TrackCardProps {
  track: Track;
  onPlay: (track: Track) => void;
  isPlaying?: boolean;
  isCurrentTrack?: boolean;
  className?: string;
}

const TrackCard = ({
  track,
  onPlay,
  isPlaying = false,
  isCurrentTrack = false,
  className = "",
}: TrackCardProps) => {
  const imageUrl = track.album.images[0]?.url || '/default-album-cover.png';
  const artistNames = track.artists.map(artist => artist.name).join(', ');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onPlay(track);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onPlay(track);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Play ${track.name} by ${artistNames}`}
      aria-pressed={isCurrentTrack}
      className={`
        group
        relative
        overflow-hidden
        bg-gradient-to-br
        from-white/5
        to-white/10
        backdrop-blur-sm
        rounded-xl
        transition-all
        duration-300
        hover:shadow-xl
        hover:shadow-green-500/10
        hover:-translate-y-1
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-green-500
        focus-visible:ring-offset-2
        focus-visible:ring-offset-gray-900
        ${isCurrentTrack 
          ? "ring-2 ring-green-500 shadow-lg shadow-green-500/20 from-green-500/20 to-blue-500/20" 
          : "hover:from-white/10 hover:to-white/15"
        }
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
    >
      <div className="p-3">
        <div className="relative overflow-hidden rounded-lg aspect-square">
          <img
            src={imageUrl}
            alt={`Album cover for ${track.name}`}
            className={`
              w-full
              h-full
              object-cover
              transition-all
              duration-300
              group-hover:scale-105
              ${isPlaying ? 'scale-105' : ''}
            `}
            loading="lazy"
          />
          
          {/* Overlay gradiente */}
          <div className={`
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            to-black/0
            transition-opacity
            duration-300
            ${isCurrentTrack || isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `} />

          {/* Botón de reproducción */}
          <div className={`
            absolute
            bottom-3
            right-3
            transition-all
            duration-300
            ${isCurrentTrack 
              ? 'scale-100 translate-y-0 opacity-100' 
              : 'scale-90 translate-y-2 opacity-0 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100'
            }
          `}>
            <div className="bg-gradient-to-r from-green-500 to-green-400 p-2 rounded-full shadow-xl hover:scale-110 transition-transform">
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="text-white font-medium truncate">
            {track.name}
          </h3>
          <p className="text-gray-400 truncate text-sm">
            {artistNames}
          </p>
        </div>

        {/* Indicador de reproducción */}
        {isCurrentTrack && (
          <div className="mt-3 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-gradient-to-r from-green-500 to-green-400 animate-pulse"
                style={{
                  animationDelay: `${i * 200}ms`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackCard;