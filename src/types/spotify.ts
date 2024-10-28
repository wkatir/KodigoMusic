export interface Track {
    id: string;
    name: string;
    artists: Array<{
      name: string;
    }>;
    album: {
      images: Array<{
        url: string;
      }>;
    };
    uri: string;
  }
  
  export interface SearchResponse {
    tracks: {
      items: Track[];
    };
  }
  