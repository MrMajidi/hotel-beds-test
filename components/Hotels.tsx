import SearchForm from "@/components/SearchForm";
import { HotelsApiParams } from "@/pages/api/hotels";
import { getHotelSearchParams } from "@/utils/util";
import { useState } from "react";
import { useHotels } from "../hooks/api";
import { HotelCard } from "./HotelCard";

export default function Hotels() {
  const [searchParams, setSearchParams] = useState("");
  const { mutate, data, isLoading } = useHotels();
  const hotels = data?.hotels.hotels;
  const total = data?.hotels.total;
  const handleSubmit = (values: HotelsApiParams) => {
    mutate(values, {
      onSuccess: () => {
        setSearchParams(getHotelSearchParams(values));
      },
    });
  };
  return (
    <div className="p-1 md:p-10 flex flex-col gap-y-5">
      <SearchForm handleSubmit={handleSubmit} isLoading={isLoading} />
      <div className="border-b border-blue-700"></div>
      {data && (
        <h2 className="font-bold text-2xl">{total} hotels found totatlly!</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hotels?.map((hotel) => (
          <HotelCard
            key={hotel.code}
            hotel={hotel}
            linkTo={`/hotel/${hotel.code}?${searchParams}`}
          />
        ))}
      </div>
    </div>
  );
}
