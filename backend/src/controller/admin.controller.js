import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js"; 
import cloudinary from "../lib/cloudinary.js" ; 



//helper function to upload files to cloudinary
const uploadtoCloudinary = async (file,folder) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto", folder: `spotify/${folder}` }) ;
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("Failed to upload file to Cloudinary"); 
    }
}

// Controller functions for admin routes
// Implement the controller functions for creating and deleting songs and albums here

// Example controller function for creating a song
export const createSong = async (req, res,next) => {
  try {
    if (!req.file|| !req.files.audioFile || !req.files.coverImage) {
        return res.status(400).json({ message: "Audio file and cover image are required" });
    }
    const {title,artist,albumId,duration} = req.body
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadtoCloudinary(audioFile, "audioFile") ;
    const imageUrl = await uploadtoCloudinary(imageFile, "imageFile") ;

    const song = new Song({
        title,
        artist,
        albumId: albumId || null, // Set to null if albumId is not provided
        duration,
        audioUrl,
        imageUrl,
    })
    await song.save() 

    // If albumId is provided, add the song to the album's songs array
    if (albumId) {
        await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }
    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.error("Error creating song:", error);
    next(error); // Pass the error to the error handling middleware
  }

};
// Example controller function for deleting a song
export const deleteSong = async (req, res,next) => {
    try {
        const {id} = req.params
        const song= await Song.findById (id)
        
        //if song belongs to an album updaate the albums songs array
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } })
        }
        await Song.findByIdAndDelete(id)
        res.status(200).json({message:"Song deleted successfully"})
    } catch (error) {
        console.error("Error deleting song:", error);
        next(error); // Pass the error to the error handling middleware
    }   

};

// Controller functions for creating and deleting albums
// Implement the createAlbum and deleteAlbum controller functions here, similar to the createSong and deleteSong functions, but with the necessary adjustments for handling albums and their associated songs.
// Example controller function for creating an album
export const createAlbum = async (req, res,next) => {
    try {
        const {title,artist,releaseYear} = req.body
        const {imageFile} = req.files

        const imageUrl = await uploadtoCloudinary(imageFile)
        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl,
        })
        await album.save() 
        res.status(201).json({ message: "Album created successfully", album });
    } catch (error) {
        console.error("Error creating album:", error);
        next(error); // Pass the error to the error handling middleware
    }
};
// Example controller function for deleting an album and its associated songs
export const deleteAlbum = async (req, res,next) => {
    try {
        const {id} = req.params
        await Song.deleteMany({albumId: id}) ; // Delete all songs that belong to the album
        await Album.findByIdAndDelete(id) ;
        res.status(200).json({message:"Album and its songs deleted successfully"})
    } catch (error) {
        console.error("Error deleting album:", error);
        next(error); // Pass the error to the error handling middleware
    }   
};


// Implement the checkAdmin controller function to verify if the user is an admin
export const checkAdmin = async (req, res,next) => {

    res.status(200).json({ admin: true, message: "User is an admin"});
};

