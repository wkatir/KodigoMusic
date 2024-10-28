import { Track } from "../types/spotify";

interface TrackCardProps {
  track: Track;
  onPlay: (track: Track) => void;
  isPlaying?: boolean;
  isCurrentTrack?: boolean;
}

const TrackCard = ({
  track,
  onPlay,
  isPlaying = false,
  isCurrentTrack = false,
}: TrackCardProps) => {
  return (
    <div
      className={`bg-gray-800 p-4 rounded-lg transition-colors cursor-pointer ${
        isCurrentTrack ? "ring-2 ring-spotify-green" : "hover:bg-gray-700"
      }`}
      onClick={() => onPlay(track)}
    >
      <div className="relative">
        <img
          src={track.album.images[0]?.url}
          alt={track.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        {isCurrentTrack && (
          <div className="absolute bottom-6 right-2 bg-spotify-green rounded-full p-2">
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        )}
      </div>
      <h3 className="text-white font-bold truncate">{track.name}</h3>
      <p className="text-gray-400 truncate">{track.artists[0].name}</p>
    </div>
  );
};

export default TrackCard;
