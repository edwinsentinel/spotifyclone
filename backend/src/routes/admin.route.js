import { Router } from "express";
import { createSong,deleteSong,createAlbum,deleteAlbum,checkAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute,requireAdmin); // Apply the protectRoute middleware to all routes in this router

router.get("/check", checkAdmin);
router.post("/",createSong);  
router.delete("/song/:id", deleteSong) ; // Implement deleteSong controller function in admin.controller.js and add it here
router.post("/albums",createAlbum) ; // Implement createAlbum controller function in admin.controller.js and add it here
router.delete("/albums/:id", deleteAlbum) ; // Implement deleteAlbum controller function in admin.controller.js and add it here    




export default router;