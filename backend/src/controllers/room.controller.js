import Room from "../models/rooms.models.js";
import { Booking } from "../models/booking.models.js";
import { User } from "../models/user.models.js";
import cloudinary from "../config/cloudinary.js";
import { Favorite } from "../models/favorite.model.js";

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

        const page = Number(req.query.page) || 1;
        const limit = 10;

        const rooms = await Room.find()
            .select(
                "title price images location isAvailable createdAt"
            )
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        res.status(200).json(rooms);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room
            .findById(req.params.id)
            .lean();
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

export const addFavoriteRooms = async (req, res) => {
    try {

        const favorite =
            await Favorite.create({
                user: req.user.id,
                room: req.params.id
            });

        res.status(201).json({
            message: "Added",
            favorite
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Already favorite"
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
}

export const getMyFavoriteRooms = async (req, res) => {
    try {
        const userId = req.user.id;

        const room = await Favorite.find({
            user: userId
        })
            .populate(
                "room",
                "title price images location"
            )
            .lean();

        res.status(200).json(room);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteRoomById = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await Room
            .findById(id)
            .lean();

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

        await Booking.deleteMany({
            roomId: id
        });
        await Room.findByIdAndDelete(id);

        res.json({ message: "Room deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRoom = async (req, res) => {

    try {

        const { id } = req.params;

        const room = await Room
            .findById(id)
            .lean();

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

            req.files?.forEach((file) => {

                if (file.mimetype.startsWith("image")) {

                    images.push(file.path);

                } else if (file.mimetype.startsWith("video")) {

                    videos.push(file.path);

                }

            });

        }

        const updateData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            images,
            videos
        };

        const updatedRoom =
            await Room.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

        res.json(updatedRoom);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};