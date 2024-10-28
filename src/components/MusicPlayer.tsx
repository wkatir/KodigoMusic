import { useEffect, useState } from 'react';

// Interfaces necesarias
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

// Interfaces para el SDK de Spotify
interface SpotifyPlayer {
  connect(): Promise<boolean>;
  disconnect(): void;
  addListener(eventName: 'ready', callback: (data: { device_id: string }) => void): boolean;
  addListener(eventName: 'player_state_changed', callback: (state: PlaybackState | null) => void): boolean;
  addListener(eventName: 'initialization_error', callback: (error: { message: string }) => void): boolean;
  addListener(eventName: 'authentication_error', callback: (error: { message: string }) => void): boolean;
  addListener(eventName: 'account_error', callback: (error: { message: string }) => void): boolean;
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

const Player = ({ track, onPlaybackStateChange }: PlayerProps) => {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState<string>('');
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Kodigo Music Player',
        getOAuthToken: cb => {
          const token = localStorage.getItem('spotify_token');
          cb(token || '');
        },
        volume: 0.5
      });

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      spotifyPlayer.addListener('player_state_changed', state => {
        if (state) {
          setIsPlaying(!state.paused);
          onPlaybackStateChange?.(!state.paused);
        }
      });

      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });

      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
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
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [track.uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`
        },
      });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const togglePlay = () => {
    if (!player) return;
    player.togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume / 100);
    }
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 border-t border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={track.album.images[0]?.url} 
            alt={track.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h4 className="text-white font-medium">{track.name}</h4>
            <p className="text-gray-400">{track.artists[0].name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-spotify-green hover:bg-green-600 text-white"
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
          
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"/>
            </svg>
            <input 
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-spotify-green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;