export interface Genre {
  name: string;
}

export interface Movie {
  id: number;
  name: string;
  alternativeName?: string;
  year: number;
  rating: {
    kp: number;
    imdb?: number;
  };
  poster?: {
    url: string;
    previewUrl: string;
  };
  description?: string;
  movieLength?: number;
  genres: Genre[];
}

export interface FiltersState {
  genres: string[];
  ratingFrom: number;
  ratingTo: number;
  yearFrom: number;
  yearTo: number;
}

export interface ApiResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
