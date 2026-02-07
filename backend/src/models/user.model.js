import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,

    },
    clerkId: {
        type: String,
        required: true,
        unique: true    
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export const User = mongoose.model("User", userSchema);