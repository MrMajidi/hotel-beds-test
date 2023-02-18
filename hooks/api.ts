import { HotelsResponse } from "@/interfaces";
import { HotelsApiParams } from "@/pages/api/hotels";
import axios from "axios";
import { useMutation } from "react-query";

async function fetchHotels(body: HotelsApiParams): Promise<HotelsResponse> {
  return axios.post("/api/hotels", body).then((response) => response.data);
}

export function useHotels() {
  return useMutation((body: HotelsApiParams) => fetchHotels(body), {
    onError: (error) => {
      alert(error);
    },
  });
}

async function fetchHotel({
  id,
  body,
}: {
  id: number;
  body: HotelsApiParams;
}): Promise<HotelsResponse> {
  return axios.post(`/api/hotel/${id}`, body).then((response) => response.data);
}

export function useHotel() {
  return useMutation(
    ({ id, body }: { id: number; body: HotelsApiParams }) =>
      fetchHotel({ id, body }),
    {
      onError: (error) => {
        alert(error);
      },
    }
  );
}
