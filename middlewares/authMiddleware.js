import Jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";

export const requireSingIn = async (req, res, next) => {
    try {
        const decode = await Jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        req.user = decode;
        next()
    } catch (error) {
        console.log("Error in requireSingIn function please check", error);
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById({ _id: req.user._id });
        if (user.role !== 1) {
            return res.status(402).send({
                success: true,
                message: 'Unauthorization access'
            });
        } else {
            next();
        }
    } catch (error) {
        console.log("Error in isAdmin", error);
        return res.status(403).send({
            success: false,
            message: "Error in isAdmin middleware",
            error
        })
    }
}