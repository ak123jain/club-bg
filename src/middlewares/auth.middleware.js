import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const verifyjwt = async(req , _ , next) =>{
    try {


        console.log("token iiiii 💕💕",req.header("Authorization"));
        console.log("token iiiii  coookie 💕💕",req.cookies.accessToken);

         const token1 = req.cookies.accessToken || req.header("Authorization").replace("Bearer ", "")
         console.log("token 😘😘😘" , token1);

        // const token = req.header("Authorization").replace("Bearer ", "");

        if (!token1) {
            console.log("token is not found 💕💕💕 provided");
        }

        const decoded = jwt.verify(token1, process.env.ACCESS_TOKEN_SECRET);
        console.log("token is verified 😍😍😍😍😍");


        const user = await User.findById(decoded.id).select("-password -refreshtoken");

        if (!user) {
            console.log("user is not found 💕💕💕");
        }

        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(401, "unauthorized beataaa😒😒😒😒")
        
    }
}