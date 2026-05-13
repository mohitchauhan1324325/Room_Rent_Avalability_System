import Room from "../models/rooms.models.js";
import { Booking } from "../models/booking.models.js";
import { User } from "../models/user.models.js";
import cloudinary from "../config/cloudinary.js";

export const addRoom = async (req, res) => {

    try {

        let images = [];
        let videos = [];

        req.files.forEach((file) => {

            if (file.mimetype.startsWith("image")) {

                images.push(file.path);

            } else if (file.mimetype.startsWith("video")) {

                videos.push(file.path);

            }

        });

        const room = new Room({
            ...req.body,
            images,
            videos
        });

        const savedRoom = await room.save();

        res.status(201).json(savedRoom);

    } catch (error) {

        console.log("ADD ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(400).json({ message: "Room not found" });
        }

        res.json(room);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllRooms = async (req, res) => {
    try {
        await Booking.deleteMany();
        await Room.deleteMany({});

        res.json({ message: "All rooms are deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRoomById = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }


        for (const image of room.images) {

            if (image.includes("cloudinary")) {

                const publicId = image
                    .split("/")
                    .slice(-1)[0]
                    .split(".")[0];

                await cloudinary.uploader.destroy(`rooms/${publicId}`);

            }

        }
        for (const video of room.videos) {

            if (video.includes("cloudinary")) {

                const publicId = video
                    .split("/")
                    .slice(-1)[0]
                    .split(".")[0];

                await cloudinary.uploader.destroy(
                    `rooms/${publicId}`,
                    { resource_type: "video" }
                );

            }

        }

        await Booking.deleteMany({ room: id });
        await Room.findByIdAndDelete(id);

        res.json({ message: "Room deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsersBooking = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate("user", "name phone")
            .populate("roomId", "title location");

        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRoom = async (req, res) => {

    try {

        const { id } = req.params;

        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        let images = room.images;
        let videos = room.videos;


        if (req.files && req.files.length > 0) {

            images = [];
            videos = [];

            req.files.forEach((file) => {

                if (file.mimetype.startsWith("image")) {

                    images.push(file.path);

                } else if (file.mimetype.startsWith("video")) {

                    videos.push(file.path);

                }

            });

        }

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                location: req.body.location,
                images,
                videos
            },
            { returnDocument: "after" }
        );

        res.json(updatedRoom);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};