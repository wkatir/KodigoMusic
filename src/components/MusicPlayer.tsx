import { useEffect, useState } from 'react';

interface Track {
  id: string;
  uri: string;
  name: string;
  album: {
    uri: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  artists: Array<{
    uri: string;
    name: string;
  }>;
}

interface PlayerProps {
  track: Track | null;
  onPlaybackStateChange?: (isPlaying: boolean) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (callback: (token: string) => void) => void;
        volume: number;
      }) => SpotifyPlayer;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface SpotifyPlayer {
  connect(): Promise<boolean>;
  disconnect(): void;
  addListener(eventName: 'ready', callback: (data: { device_id: string }) => void): boolean;
  addListener(eventName: 'player_state_changed', callback: (state: PlaybackState | null) => void): boolean;
  addListener(eventName: 'initialization_error', callback: (error: { message: string }) => void): boolean;
  addListener(eventName: 'authentication_error', callback: (error: { message: string }) => void): boolean;
  addListener(eventName: 'account_error', callback: (error: { message: string }) => void): boolean;
  removeListener(eventName: string): void;
  togglePlay(): Promise<void>;
  setVolume(volume: number): Promise<void>;
}

interface PlaybackState {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: {
      id: string;
      uri: string;
      name: string;
      album: {
        uri: string;
        name: string;
        images: { url: string }[];
      };
      artists: { uri: string; name: string }[];
    };
  };
}

const Player = ({ track, onPlaybackStateChange, onError }: PlayerProps) => {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState<string>('');
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = (message: string) => {
    setErrorMessage(message);
    onError?.(message);
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      handleError('No se encontró token de Spotify. Por favor, inicia sesión nuevamente.');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    script.onerror = () => {
      handleError('Error al cargar el SDK de Spotify');
    };

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Kodigo Music Player',
        getOAuthToken: cb => {
          cb(token);
        },
        volume: 0.5
      });

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        setIsLoading(false);
      });

      spotifyPlayer.addListener('player_state_changed', state => {
        if (state) {
          setIsPlaying(!state.paused);
          onPlaybackStateChange?.(!state.paused);
        }
      });

      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        handleError(`Error de inicialización: ${message}`);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        handleError(`Error de autenticación: ${message}`);
      });

      spotifyPlayer.addListener('account_error', ({ message }) => {
        handleError(`Error de cuenta: ${message}`);
      });

      spotifyPlayer.connect()
        .then(success => {
          if (!success) {
            handleError('Failed to connect to Spotify');
          }
        })
        .catch(error => {
          handleError(`Error connecting to Spotify: ${error.message}`);
        });

      setPlayer(spotifyPlayer);
    };

    return () => {
      if (player) {
        player.disconnect();
        player.removeListener('ready');
        player.removeListener('player_state_changed');
        player.removeListener('initialization_error');
        player.removeListener('authentication_error');
        player.removeListener('account_error');
      }
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (track && deviceId) {
      playTrack();
    }
  }, [track, deviceId]);

  const playTrack = async () => {
    if (!track || !deviceId) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [track.uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      handleError(`Error reproduciendo la pista: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!player) return;
    try {
      await player.togglePlay();
    } catch (error) {
      handleError(`Error al cambiar estado de reproducción: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (player) {
      try {
        await player.setVolume(newVolume / 100);
      } catch (error) {
        handleError(`Error al ajustar el volumen: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 p-6">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-3">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
          <span className="text-white mt-3 font-medium">Iniciando reproductor...</span>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-900 to-red-800 p-6">
        <div className="container mx-auto text-center">
          <div className="bg-red-800/50 p-4 rounded-xl">
            <p className="text-white font-medium">{errorMessage}</p>
            <button 
              onClick={() => setErrorMessage(null)}
              className="mt-3 px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 text-white font-medium transition-all duration-200 hover:shadow-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 p-6 border-t border-gray-700/50 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <img 
              src={track.album.images[0]?.url} 
              alt={track.name}
              className="relative w-20 h-20 object-cover rounded-lg shadow-2xl transform group-hover:scale-105 transition duration-200"
            />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg tracking-wide truncate max-w-xs">
              {track.name}
            </h4>
            <p className="text-gray-400 font-medium truncate max-w-xs mt-1">
              {track.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"/>
            </svg>
            <input 
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 accent-green-400 hover:accent-blue-500 transition-all duration-200 focus:outline-none"
              aria-label="Control de volumen"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;