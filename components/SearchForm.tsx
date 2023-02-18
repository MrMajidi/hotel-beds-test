import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  HotelsApiParams,
  HotelSearchValidationSchema,
} from "@/pages/api/hotels";

export const cityOptions = [
  {
    id: 1,
    label: "New York",
    value: { latitude: 40.7128, longitude: -74.006 },
  },
  {
    id: 2,
    label: "Paris",
    value: { latitude: 48.8566, longitude: 2.3522 },
  },
  {
    id: 3,
    label: "London",
    value: { latitude: 51.5074, longitude: -0.1278 },
  },
  {
    id: 4,
    label: "Berlin",
    value: { latitude: 52.52, longitude: 13.405 },
  },
  {
    id: 5,
    label: "Toronto",
    value: { latitude: 43.6532, longitude: -79.3832 },
  },
];

const roomOptions = [
  { value: 1, label: "1 Room" },
  { value: 2, label: "2 Rooms" },
  { value: 3, label: "3 Rooms" },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const initialValues: HotelsApiParams = {
  checkIn: today,
  checkOut: tomorrow,
  rooms: roomOptions[0].value,
  geoLocation: cityOptions[0].value,
  adults: 1,
  children: 0,
};

const BookingForm = ({
  isLoading,
  handleSubmit,
}: {
  isLoading: boolean;
  handleSubmit: (values: HotelsApiParams) => void;
}) => {
  return (
    <div className="w-full mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={HotelSearchValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, handleSubmit, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 items-end gap-x-2 gap-y-2">
                <div className="flex-1">
                  <label
                    htmlFor="geoLocation"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    City
                  </label>
                  <Field
                    as="select"
                    name="geoLocation"
                    id="geoLocation"
                    className="w-full px-3 py-2 border rounded"
                    value={
                      cityOptions.find(
                        (city) =>
                          city.value.latitude === values.geoLocation?.latitude
                      )?.id
                    }
                    onChange={(event: any) => {
                      const cityId = parseInt(event.target.value);
                      setFieldValue(
                        "geoLocation",
                        cityOptions.find((city) => city.id === cityId)?.value
                      );
                    }}
                  >
                    {cityOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="checkIn"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Check-in
                  </label>
                  <DatePicker
                    id="checkIn"
                    selected={values.checkIn}
                    onChange={(date: Date) => setFieldValue("checkIn", date)}
                    className="w-full px-3 py-2 border rounded"
                    minDate={today}
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="checkOut"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Check-out
                  </label>
                  <DatePicker
                    id="checkOut"
                    selected={values.checkOut}
                    onChange={(date: Date) => setFieldValue("checkOut", date)}
                    className="w-full px-3 py-2 border rounded"
                    minDate={tomorrow}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="rooms"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Rooms
                  </label>
                  <Field
                    as="select"
                    name="rooms"
                    id="rooms"
                    className="w-full px-3 py-2 border rounded"
                  >
                    {roomOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="adults"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Adults
                  </label>
                  <Field
                    type="number"
                    name="adults"
                    id="adults"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="children"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Children
                  </label>
                  <Field
                    type="number"
                    name="children"
                    id="children"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
              {Object.keys(errors).map((error) => (
                <ErrorMessage
                  name={error}
                  key={error}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              ))}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingForm;
