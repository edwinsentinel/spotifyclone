import mongoose from "mongoose";


const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,

    },
    audioUrl: {
        type: String,
        required: true, 
    },
    duration: {
        type: Number,
        required: true,
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: false, // Set to false if a song can exist without an album    
        },    
    }, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export const Song = mongoose.model("Song", songSchema);
