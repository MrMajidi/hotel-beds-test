import { Hotel } from "@/interfaces";
import Link from "next/link";
import { FaDollarSign, FaDoorOpen, FaMapMarker, FaStar } from "react-icons/fa";
interface HotelCardProps {
  hotel: Hotel;
  linkTo: string;
}

export function HotelCard({ hotel, linkTo }: HotelCardProps) {
  const priceRange = `${hotel.minRate}-${hotel.maxRate} ${hotel.currency}`;

  return (
    <Link href={linkTo}>
      <div className="border rounded-lg overflow-hidden shadow-md">
        <div className="bg-gray-200 p-4 text-xl font-bold flex truncate">
          {hotel.name}
        </div>
        <div className="flex flex-col gap-1 p-4">
          <div className="hotel-card-items">
            <FaDoorOpen />
            {hotel.rooms?.length} Rooms available
          </div>
          <div className="hotel-card-items text-yellow-600">
            <FaStar />
            {hotel.categoryName}
          </div>
          <div className="hotel-card-items">
            <FaMapMarker />
            {hotel.zoneName}, {hotel.destinationName}
          </div>

          <div className="hotel-card-items text-gray-600 text-sm">
            <FaDollarSign />
            {priceRange}
          </div>
        </div>
      </div>
    </Link>
  );
}
