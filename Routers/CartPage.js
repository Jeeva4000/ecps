import express from "express";
import { CartModel, OrderModel, UserModel } from "../Helper/mongoose_scheme.js";

const router = express.Router();

//Check cart
router.get("/", (req, res) => {
    res.status(200).json({ message: "cart working" });
});
//Get user cart items
router.post("/", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.headers.email });
        if (!user) {
            return res.status(403).json({ message: "no user found" });
        }
        const items = await CartModel.find({ email: req.headers.email });
        res.status(200).json({ message: "cart items", items });
    } catch (error) {
        res.status(500).json({ error });
    }
});
//Add user cart items
router.post("/add-item", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.headers.email });
        if (!user) {
            return res.status(403).json({ message: "no user found" });
        }
        const newCartItem = await CartModel({
            email: req.headers.email,
            product_id: req.body._id,
            product_name: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
            image_url: req.body.image_url,
        }).save();
        res.status(200).json({ message: "cart items", newCartItem });
    } catch (error) {
        res.status(500).json({ message: "error...", error });
    }
});
//delete user cart items
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await CartModel.deleteOne({
            _id: id,
        });
        res.status(200).json({ message: "Deleted Success", id });
    } catch (error) {
        res.status(500).json({ error });
    }
});
//Buy product
router.post("/buy", async (req, res) => {
    try {
        const newOrder = await OrderModel({
            email: req.body.email,
            address: req.body.address,
            mobile: req.body.mobile,
            product_name: req.body.product_name,
            image_url: req.body.image_url,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
        }).save();
        res.status(200).json({ message: "order placed", newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
});

export const CartPage = router;