import { useHotel } from "@/hooks/api";
import SingleHotelDetails from "@/components/SingleHotelDetails";
import type { Hotel } from "@/interfaces";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SingleHotelSearchValidationSchema } from "../api/hotel/[id]";

export default function Hotel() {
  const router = useRouter();

  const { mutate, data, error, isLoading } = useHotel();

  useEffect(() => {
    if (router.query) {
      try {
        const body = SingleHotelSearchValidationSchema.validateSync(
          router.query
        );
        const { id } = router.query;
        mutate({ id: parseInt(id as string), body });
      } catch (e) {}
    }
  }, [router.query]);

  const hotel = data?.hotels?.hotels?.[0];
  if (error) return <div>Failed to load hotel</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <></>;

  if (!hotel) {
    router.replace("/error404");

    return null;
  }

  return <SingleHotelDetails hotel={hotel} />;
}
