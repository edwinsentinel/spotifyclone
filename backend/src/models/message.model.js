import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },//clerkId of the sender    
    receiver: {
        type: String,
        required: true,
    },//clerkId of the receiver
    content: {
        type: String,
        required: true,
    },
    }, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
}); 

export const Message = mongoose.model("Message", messageSchema);