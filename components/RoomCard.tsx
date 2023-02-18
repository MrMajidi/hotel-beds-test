import { RoomsEntity } from "@/interfaces";
import React from "react";
import { FaDollarSign } from "react-icons/fa";

const RoomCard = ({
  room,
  onClick,
  index,
}: {
  room: RoomsEntity;
  onClick: () => void;
  index: number;
}) => {
  return (
    <div
      key={room.code}
      className="bg-white rounded-lg overflow-hidden flex flex-col cursor-pointer shadow-md"
      onClick={onClick}
    >
      <div className="bg-gray-200 font-bold p-2 truncate">
        {index + 1}. {room.name}
      </div>

      <div className="p-2 flex flex-col items-start">
        <div className="text-sm">
          <span className="font-bold">Code:</span>{" "}
          <span className="text-yellow-600">{room.code}</span>
        </div>

        {room.rates?.[0] && (
          <>
            <div className="text-sm">
              <span className="font-bold">Board Name:</span>{" "}
              <span className="text-yellow-600">{room.rates[0].boardName}</span>
            </div>

            <div className="text-sm">
              <span className="font-bold">Packaging:</span>{" "}
              <span className="text-yellow-600">
                {room.rates[0].packaging ? "YES" : "NO"}
              </span>
            </div>

            <div className="text-sm">
              <span className="font-bold">Payment Type:</span>{" "}
              <span className="text-yellow-600">
                {room.rates[0].paymentType}
              </span>
            </div>
          </>
        )}
      </div>

      {room.rates?.[0] && (
        <div className="py-2 px-3 self-stretch border-t border-yellow-600 flex items-center justify-between ">
          <div className="text-sm flex items-baseline gap-x-1">
            Children:
            <span className="text-yellow-600">{room.rates[0].children}</span>
          </div>
          <div className="text-sm flex items-baseline gap-x-1">
            Adults:
            <span className="text-yellow-600">{room.rates[0].adults}</span>
          </div>
          <div className="text-sm flex items-center text-lg font-bold">
            <FaDollarSign />
            {room.rates[0].net}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;
