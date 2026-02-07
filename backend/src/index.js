import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import { connectDB } from './lib/db.js';
import fileUpload from 'express-fileupload' ;
import path from 'path';
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const __dirname = path.resolve() ; // Get the current directory path  
const PORT = process.env.PORT || 3000;



// Middleware
app.use(express.json());// Parse JSON bodies
app.use(clerkMiddleware()) ; // Clerk middleware for authentication ie adds auth to request object
app.use (fileUpload({
  useTempFiles : true ,
  tempFileDir : path.join(__dirname,"tmp") ,
  createParentPath : true,
  limits : { fileSize : 10 * 1024 * 1024 } // Limit file size to 10MB   
})) ; // Middleware for handling file uploads






// Routes
app.use("/api/users",userRoutes) ;
app.use("/api/auth",authRoutes) ;
app.use("/api/admin",adminRoutes) ;
app.use("/api/songs",songRoutes) ;
app.use("/api/albums",albumRoutes) ;
app.use("/api/stats",statRoutes) ; 


//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: process.env.NODE_ENV === "production" ? "An error occurred" : err.message }); 
}); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});