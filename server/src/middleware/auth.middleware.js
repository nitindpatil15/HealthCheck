import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';
import { asynchandler } from '../utils/asynchandler.js';

const verifyJWT = asynchandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        console.log("Token from middelware to check ",token)
        if(!token){
            return res.status(400).json({ error: "UnAuthorized request" });
        }
        
        const decodedJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(`Decoded JWT: ${decodedJWT}`);
        
        if (!decodedJWT) {
            return res.status(400).json({ error: "Unauthorized request from middleware" });            
        }

        const user = await User.findById(decodedJWT?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res.status(400).json({ error: "Invalid token" });           
        }

        req.user = user;
        console.log(`User Authenticated: ${user}`);
        next();
    } catch (error) {
        return res.status(400).json({ error: "Access Denied" });           
    }
});

export default verifyJWT;