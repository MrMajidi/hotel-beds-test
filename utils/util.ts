import { API_KEY, SECRET_KEY } from "@/constants/constants";
import { HotelsApiParams } from "@/pages/api/hotels";
import crypto from "crypto";

export function calculateSha256Hex() {
  const timestamp = Math.floor(Date.now() / 1000);
  const message = `${API_KEY}${SECRET_KEY}${timestamp}`;
  const hash = crypto.createHash("sha256").update(message).digest("hex");
  return hash;
}

export const getHotelSearchParams = (searchParams: HotelsApiParams) => {
  delete searchParams.geoLocation;
  const urlParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    urlParams.append(key, String(value));
  }

  return urlParams.toString();
};
