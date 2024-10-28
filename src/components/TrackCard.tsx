import { Track } from "../types/spotify";

interface TrackCardProps {
  track: Track;
  isPlaying?: boolean;
}

const TrackCard = ({ track, isPlaying }: TrackCardProps) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg 
                    shadow-sm hover:shadow-md transition-all duration-200 relative"
    >
      <div className="relative">
        <img
          src={track.album.images[0]?.url}
          alt={track.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        {isPlaying && (
          <div
            className="absolute top-2 right-2 bg-blue-500 dark:bg-blue-600 text-white 
                          px-3 py-1 rounded-full text-xs font-medium shadow-sm"
          >
            Playing
          </div>
        )}
      </div>
      <h3 className="text-gray-800 dark:text-white font-semibold text-lg truncate mb-1">
        {track.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
        {track.artists[0].name}
      </p>
    </div>
  );
};

export default TrackCard;
