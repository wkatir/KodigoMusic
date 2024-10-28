export interface Track {
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

export interface SpotifyPlayerProps {
  track: Track | null;
  onPlaybackStateChange?: (isPlaying: boolean) => void;
}