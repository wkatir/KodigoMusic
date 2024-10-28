import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from "react-icons/fa";

interface MusicPlayerProps {
  track: {
    uri: string;
    name: string;
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
  } | null;
  token: string | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, token }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [track]);

  const handlePlayPause = async () => {
    if (!token) return;

    try {
      const endpoint = `https://api.spotify.com/v1/me/player/${
        isPlaying ? "pause" : "play"
      }`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [track?.uri],
        }),
      });

      if (response.ok) {
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error("Error al controlar la reproducción:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4">
            {track && (
              <>
                <img
                  src={track.album.images[2]?.url}
                  alt={track.name}
                  className="w-12 h-12 rounded-lg shadow-sm"
                />
                <div>
                  <h4 className="text-gray-800 dark:text-white font-semibold">
                    {track.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {track.artists[0].name}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
            <button
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              onClick={() => console.log("Anterior")}
            >
              <FaStepBackward size={18} />
            </button>

            <button
              className="w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center 
                         hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-sm"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <FaPause className="text-white" size={18} />
              ) : (
                <FaPlay className="text-white pl-1" size={18} />
              )}
            </button>

            <button
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              onClick={() => console.log("Siguiente")}
            >
              <FaStepForward size={18} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-3">
            <FaVolumeUp
              className="text-gray-600 dark:text-gray-400"
              size={18}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-blue-500"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 mt-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-100 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
