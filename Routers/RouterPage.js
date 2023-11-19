import express from "express";
import { ProductModel } from "../Helper/mongoose_scheme.js";

const router = express.Router();
router.get("/", (req, res) => {
    try {
        res.status(200).json({ message: "working" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ message: "products", products });
    } catch (error) {
        console.log(error);
    }
});

export const RouterPage = router;