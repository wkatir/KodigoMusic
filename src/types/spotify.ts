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
  export interface SearchResponse {
    tracks: {
      items: Track[];
    };
  }
  