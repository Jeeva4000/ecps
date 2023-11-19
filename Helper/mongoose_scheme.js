import mongoose from "mongoose";

const adminSchema = await mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const userSchema = await mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const productSchema = await mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date(),
    },
});
const ordersSchema = await mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    order_status: {
        type: String,
        required: true,
        default: "Order Placed",
    },
    date: {
        type: String,
        required: true,
        default: new Date(),
    },
});
const cartSchema = await mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
});

export const AdminModel = mongoose.model("admins", adminSchema);
export const UserModel = mongoose.model("users", userSchema);
export const ProductModel = mongoose.model("products", productSchema);
export const OrderModel = mongoose.model("orders", ordersSchema);
export const CartModel = mongoose.model("carts", cartSchema);