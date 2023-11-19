import express from "express";
import { OrderModel, UserModel } from "../Helper/mongoose_scheme.js";
import { generateUserToken } from "../Helper/generateToken.js";
import { passwordComparing, passwordHashing } from "../Helper/hashPassword.js";

const router = express.Router();
//User check
router.get("/", (req, res) => {
    res.send({ message: "User page working" });
});
//User login
router.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(403).json({ message: "no user found" });
        }
        const verification = await passwordComparing(
            req.body.password,
            user.password
        );
        if (!verification) {
            return res.status(403).json({ message: "Invalid credential " });
        }
        //token generating
        const token = await generateUserToken(req.body.email);
        res.status(200).json({
            message: "login success",
            token,
            email: user.email,
            userName: user.userName,
        });
    } catch (error) {
        console.log(error);
    }
});
//user signup
router.post("/signup", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(403).json({ message: "User already exists" });
        }
        const hashedPassword = await passwordHashing(req.body.password);
        const newUser = await UserModel({
            userName: req.body.userName,
            mobile: req.body.mobile,
            email: req.body.email,
            password: hashedPassword,
        }).save();
        res.status(200).json({ message: "SignUp Success", newUser });
    } catch (error) {
        res.status(500).json({ message: "Unable to signup", error });
    }
});

export const UserPage = router;
