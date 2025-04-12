import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWNkMTVjNDMxOWExMDc2MWE1MmVhYTlhYzM2Y2YyNyIsIm5iZiI6MTc0MzE2MjAyOS42NDQsInN1YiI6IjY3ZTY4YWFkNDIxZWI4YzMzMWJhODZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GfkeJ0HU99Hi4PH_e51Vq5qQzguTLwpfNvFp8_KN1CM';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: AUTH_TOKEN,
  },
});

export const fetchMovies = async (category: string, page: number) => {
  const response = await axiosInstance.get(`/movie/${category}?language=en-US&page=${page}`);
  return response.data;
};

export const fetchTvShows = async (category: string, page: number) => {
  const response = await axiosInstance.get(`/tv/${category}?language=en-US&page=${page}`);
  return response.data;
};

export const fetchMoviesByLanguage = async (langCode: string, page: number)=>{
  const response = await axiosInstance.get(`discover/movie?language=en-US&with_original_language=${langCode}&page=${page}`);
  return response.data;
}

export const fetchTvShowsByLanguage = async (langCode: string, page: number)=>{
  const response = await axiosInstance.get(`discover/tv?with_original_language=${langCode}&language=en-US&page=${page}`);
  return response.data;
}
export const  fetchMoviesByGenre= async (page: number)=>{
  const response = await axiosInstance.get(`discover/movie?&language=en-US&with_genres=16,10751&page=${page}`);
  return response.data;
}
export const  fetchTvShowsChildren= async (page: number)=>{
  const response = await axiosInstance.get(`discover/tv?&language=en-US&with_genres=16,10751&page=${page}`);
  return response.data;
}

// https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=ta-IN&with_genres=16,10751&sort_by=popularity.desc

