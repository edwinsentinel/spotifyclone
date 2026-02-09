import Song from "../models/song.model.js";


// Example controller function for getting all songs
export const getAllSongs= async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });// Sort by createdAt in descending order
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}


// For simplicity, we are using random songs as featured songs. In a real application, you would use actual metrics to determine featured songs.
export const getFeaturedSongs = async (req, res, next) => {
    try {
        const songs= await Song.aggregate([
            {
                $sample: { size: 6 } // Randomly select 10 songs using monhgoDB aggregation pipeline
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);
        res.status(200).json(songs);
    } catch (error) { next(error);
    }
};


// For simplicity, we are using random songs as made for you songs. In a real application, you would use user preferences and listening history to determine made for you songs.
export const getMadeForYouSongs = async (req, res, next) => {
    try {
        const songs= await Song.aggregate([
            {
                $sample: { size: 4 } // Randomly select 10 songs using monhgoDB aggregation pipeline
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);
        res.status(200).json(songs);
    } catch (error) { next(error);
    }
};


// For simplicity, we are using random songs as trending songs. In a real application, you would use actual metrics to determine trending songs.
export const getTrendingSongs = async (req, res, next) => {
    try {
        const songs= await Song.aggregate([
            { 
                $sample: { size: 4 } // Randomly select 10 songs using monhgoDB aggregation pipeline
            },
            {   
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);
        res.status(200).json(songs);
    } catch (error) { next(error);
    }
};
