import { Hotel, RatesEntity, RoomsEntity } from "@/interfaces";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaArrowCircleLeft,
  FaFilter,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import RoomCard from "./RoomCard";

const SingleHotelDetails = ({ hotel }: { hotel: Hotel }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomsEntity | undefined>(
    hotel.rooms?.[0]
  );
  const [firstRatesRow, setFirstRatesRow] = useState<RatesEntity>();
  useEffect(() => {
    if (selectedRoom && selectedRoom.rates) {
      setFirstRatesRow(selectedRoom.rates[0]);
    }
  }, [selectedRoom]);
  const router = useRouter();
  return (
    <div className="p-4 sm:p-10 flex flex-col gap-y-5">
      <div className="flex flex-wrap gap-x-8">
        <button onClick={() => router.push("/")}>
          <FaArrowCircleLeft size={30} className="text-yellow-600" />
        </button>
        <div className="flex items-baseline gap-x-2">
          <h2 className="font-bold text-xl sm:text-2xl">{hotel.name}</h2>
          <div className="hotel-card-items text-yellow-600 font-bold">
            <FaStar />
            {hotel.categoryName}
          </div>
        </div>
        <div className="hotel-card-items ml-auto">
          <FaMapMarkerAlt />
          {hotel.zoneName}, {hotel.destinationName}
        </div>
      </div>

      <div className="border-b border-blue-700"></div>

      <div className="flex flex-col-reverse lg:flex-row items-start gap-6">
        <div className="w-full lg:w-1/2">
          {selectedRoom && firstRatesRow && (
            <div className="lg:px-4">
              <div className="flex items-baseline gap-x-2">
                <h3 className="font-bold text-xl">{selectedRoom.name}</h3>
                <span className="text-yellow-600 text-xs">
                  ({selectedRoom.code})
                </span>
              </div>

              <div className="p-4 rounded-lg shadow-md bg-gray-50 mt-6">
                <div className="flex flex-col">
                  {Object.keys(firstRatesRow).map(
                    (item, index) =>
                      (typeof firstRatesRow[item as keyof RatesEntity] ===
                        "string" ||
                        typeof firstRatesRow[item as keyof RatesEntity] ===
                          "number") &&
                      item !== "rateKey" && (
                        <div
                          key={index}
                          className="p-2 truncate border-b border-gray-400"
                        >
                          <>
                            {item}: {firstRatesRow[item as keyof RatesEntity]}
                          </>
                        </div>
                      )
                  )}
                </div>

                <div className="mt-4">
                  <div className="italic text-sm">
                    <span className="text-yellow-600 font-bold text-lg">
                      *Note:
                    </span>{" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    quod, inventore magni accusantium cum eos repellendus ab
                    dolores ipsa dolor ratione maiores fugiat doloremque.
                    Corrupti sequi dolores repellendus corporis facilis.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2">
          <h3 className="font-bold text-xl">
            Available rooms: ({hotel.rooms?.length || 0})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full">
            {hotel.rooms?.map((room, index) => (
              <RoomCard
                key={index}
                index={index}
                room={room}
                onClick={() => setSelectedRoom(room)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotelDetails;
