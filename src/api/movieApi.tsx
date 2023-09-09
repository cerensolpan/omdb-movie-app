// api/moviesApi.js
import axios from "axios";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_API_KEY;

const moviesApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const fetchMovieDetails = async (id:string | undefined) => {
  try {
    const response = await moviesApi.get("/", {
      params: {
        i: id
      },
    });

    return response.data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default moviesApi;
