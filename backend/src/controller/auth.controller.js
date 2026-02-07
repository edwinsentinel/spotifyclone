import {User} from "../models/User.model.js";


export const authcallback = async (req,res)=>{
    try {
        const {id,firstName,lastName,imageUrl} = req.body ;

        //check if the user exists in the database
        const user = await User.findOne({clerkId:id}) ;
        if (!user) {
            //create a new user
            await User.create({
                clerkId:id,
                fullName:`${firstName} ${lastName}`,
                imageUrl
            }) 
        }
        res.status(200).json({message:"User authenticated successfully"}) ;

    } catch (error) {
        console.error("Error in /callback route:", error);
        res.status(500).json({message:"Internal server error"}) ;
    }
    }