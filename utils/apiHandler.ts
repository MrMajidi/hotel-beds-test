import { API_BASE_URL, API_KEY } from "@/constants/constants";
import axios from "axios";

export const serverApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        accept: "application/json",
        "content-type": "application/json",
        "Accept-Encoding": "gzip",
        "Api-Key": API_KEY,
      }
  });

  export const clientApi = axios.create();
  clientApi.interceptors.response.use((response) => response, (error) => {
    alert(error.response.data.message)
  }); 