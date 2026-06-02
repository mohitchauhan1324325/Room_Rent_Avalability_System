import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import useFavoriteRooms from "../hooks/useFavoriteRooms";

const RoomCard = ({
  rooms,
  handleDelete,
  handleEdit,
  handleDetails,
}) => {

  const { addToFavorite } = useFavoriteRooms();

  const navigate = useNavigate();

  const role = getUserRole();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <Card
          key={room._id}
          className="
          w-full max-w-none
          flex flex-col
          shadow-lg
        bg-white/90 dark:bg-gray-900/90
        backdrop-blur-md
        border border-gray-200 dark:border-gray-700
        text-gray-800 dark:text-white
        hover:shadow-2xl
        transition duration-300
      "
        >
          {/* IMAGE */}
          <CardHeader
            floated={false}
            className="relative cursor-pointer m-0 rounded-b-none"
            onClick={() => handleDetails(room._id)}
          >
            <img
              src={room.images[0]}
              alt={room.title}
              className="h-48 w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {role === "user" && (
              <IconButton
                type="button"
                size="sm"
                variant="text"
                className="
              !absolute top-2 right-2
              rounded-full z-50
              bg-black/30 backdrop-blur-sm
              hover:bg-black/50
            "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();

                  addToFavorite(room._id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-red-500"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </IconButton>
            )}
          </CardHeader>

          {/* BODY */}
          <CardBody
            className="flex flex-col flex-1 cursor-pointer"
            onClick={() => handleDetails(room._id)}
          >
            <div className="mb-3 flex items-center justify-between">
              <Typography
                variant="h5"
                className="font-semibold text-gray-800 dark:text-white"
              >
                ₹{room.price}
              </Typography>

              <div className="flex items-center gap-1 text-yellow-500">
                ⭐
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  5.0
                </span>
              </div>
            </div>

            <Typography
              className="
            font-semibold text-lg
            line-clamp-1
            text-gray-800 dark:text-white
          "
            >
              {room.title}
            </Typography>

            <Typography
              className="
            mt-2 text-sm
            line-clamp-2
            text-gray-600 dark:text-gray-300
          "
            >
              {room.description || "No description available"}
            </Typography>
          </CardBody>

          {/* FOOTER */}
          {room.isAvailable && role === "user" && (
            <CardFooter className="pt-0 flex justify-center">
              <Button
                className="
              w-[200px]
              !bg-black !text-white
              dark:!bg-white dark:!text-black
            "
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/booking", {
                    state: room,
                  });
                }}
              >
                Reserve
              </Button>
            </CardFooter>
          )}

          {!room.isAvailable && (
            <CardFooter className="pt-0 flex justify-center">
              <Button
                disabled
                className="w-[200px]"
              >
                Booked
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default RoomCard;