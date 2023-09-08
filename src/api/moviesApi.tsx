import axios from "axios";

const BASE_URL = "http://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_API_KEY;

const moviesApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const fetchMovies = async (page:number, search:string, type:string, year:string) => {
  try {
    const response = await moviesApi.get("/", {
      params: {
        page,
        s: search,
        type:type,
        y: year
      },
    });

    return response.data || [];
  } catch (error) {
    throw error;
  }
};

export default moviesApi;
