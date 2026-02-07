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

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(express.json());// Parse JSON bodies
app.use(clerkMiddleware) ; // Clerk middleware for authentication
// Routes
app.use("/api/users",userRoutes) ;
app.use("/api/auth",authRoutes) ;
app.use("/api/admin",adminRoutes) ;
app.use("/api/songs",songRoutes) ;
app.use("/api/albums",albumRoutes) ;
app.use("/api/stats",statRoutes) ; 


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});