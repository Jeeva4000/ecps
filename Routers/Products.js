import express from "express";
import { ProductModel } from "../Helper/mongoose_scheme.js";

const router = express.Router();
//Products page check
router.get("/", (req, res) => {
    res.status(200).json({ message: "Admin page working" });
});
//Add Product
router.post("/addProduct", async (req, res) => {
    try {
        const new_product = await ProductModel({
            product_name: req.body.product_name,
            image_url: req.body.image_url,
            price: req.body.price,
            description: req.body.description,
        }).save();
        res.status(200).json({ message: "SignUp Success", new_product });
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Unable to Add", error });
    }
});
//Delete Product
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel.deleteOne({
            _id: id,
        });
        res.status(200).json({ message: "Deleted Success", id });
    } catch (error) {
        console.log(error);
    }
});
//Update Product
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const updated_product = await ProductModel.updateOne(
            { _id: id },
            {
                product_name: req.body.product_name,
                image_url: req.body.image_url,
                price: req.body.price,
                description: req.body.description,
                status: req.body.status,
            }
        )
            .then((updated_product) =>
                res.status(200).json({ message: "Update Success", updated_product })
            )
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: "Unable to Update", error });
            });
    } catch (error) {
        console.log(error);
    }
});

export const ProductsPage = router;