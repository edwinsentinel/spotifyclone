import { clerkClient } from "@clerk/express";


// Middleware to protect routes and ensure the user is authenticated
export const protectRoute = async (req, res, next) => {
    const { userId } = await clerkClient.users.getUser(req.body.userId);
    if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized-you must be logged in" });
    }
    next();
};

// Middleware to check if the user is an admin
export const requireAdmin = (req, res, next) => {
    try {
        const currentUser = clerkClient.users.getUser(req.body.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden-you must be an admin" });
        }
        next();
    } catch (error) {
        console.error("Error in requireAdmin middleware:", error);
       next(error); // Pass the error to the error handling middleware
    }
};