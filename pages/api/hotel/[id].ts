import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiError, HotelsResponse } from "@/interfaces";
import { calculateSha256Hex } from "@/utils/util";
import * as Yup from "yup";
import { serverApi } from "@/utils/apiHandler";

export const SingleHotelSearchValidationSchema = Yup.object().shape({
  checkIn: Yup.date().required("Check-in date is required"),
  checkOut: Yup.date()
    .required("Check-out date is required")
    .min(Yup.ref("checkIn"), "Check-out date must be after check-in date"),
  rooms: Yup.number().positive().required("Rooms field is required"),
  adults: Yup.number()
    .typeError("Must be a number")
    .min(1, "At least one adult is required")
    .required("Adults field is required"),
  children: Yup.number().default(0),
});

export type SingleHotelApiParams = Yup.InferType<
  typeof SingleHotelSearchValidationSchema
>;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HotelsResponse | ApiError>
) {
  if (_req.method === "GET") {
    res.status(503).json({ message: "Method not allowed" });
    return;
  }
  try {
    const { id } = _req.query;
    const { checkIn, checkOut, adults, children, rooms } =
      await SingleHotelSearchValidationSchema.validate(_req.body);
    const signature = calculateSha256Hex();
    const response = await serverApi.post<HotelsResponse>(
      "/hotels",
      {
        stay: {
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
        },
        occupancies: [
          {
            rooms,
            adults,
            children,
          },
        ],
        hotels: {
          hotel: [id],
        },
      },
      {
        headers: {
          "X-Signature": signature,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json({
      message: "Error",
      error: e,
    });
    return;
  }
}
