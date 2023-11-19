import express from "express";
import { AdminModel } from "../Helper/mongoose_scheme.js";
import { passwordComparing, passwordHashing } from "../Helper/hashPassword.js";
import { generateToken } from "../Helper/generateToken.js";

const router = express.Router();
//Admin page check
router.get("/", (req, res) => {
    res.status(200).json({ message: "Admin page working" });
});
//Admin Login
router.post("/login", async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ email: req.body.email });
        if (!admin) {
            res.status(403).json({ message: "no user found" });
            return;
        }
        const verification = await passwordComparing(
            req.body.password,
            admin.password
        );
        if (!verification) {
            res.status(403).json({ message: "Invalid credential " });
            return;
        }
        //token generating
        const token = await generateToken(req.body.email);
        res
            .status(200)
            .json({ message: "login success", token, email: admin.email });
    } catch (error) {
        console.log(error);
    }
});
//Admin signup
router.post("/signup", async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ email: req.body.email });
        if (admin) {
            return res.status(403).json({ message: "User already exists" });
        }
        const hashedPassword = await passwordHashing(req.body.password);
        const newAdmin = await AdminModel({
            adminName: req.body.adminName,
            email: req.body.email,
            password: hashedPassword,
        }).save();
        res.status(200).json({ message: "SignUp Success", newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Unable to signup", error });
    }
});

export const AdminPage = router;
