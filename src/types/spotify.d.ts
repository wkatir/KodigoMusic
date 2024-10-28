interface Window {
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (callback: (token: string) => void) => void;
        volume: number;
      }) => Spotify.Player;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
  
  declare namespace Spotify {
    interface Player {
      connect(): Promise<boolean>;
      disconnect(): void;
      addListener(eventName: 'ready', callback: (data: { device_id: string }) => void): void;
      addListener(eventName: 'player_state_changed', callback: (state: PlaybackState | null) => void): void;
      addListener(eventName: 'initialization_error', callback: (error: { message: string }) => void): void;
      addListener(eventName: 'authentication_error', callback: (error: { message: string }) => void): void;
      addListener(eventName: 'account_error', callback: (error: { message: string }) => void): void;
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
  }
  