import express from "express";
import cors from "cors";
import { } from "dotenv/config.js";
import { db_connection } from "./Database/db_connection.js";
import { RouterPage } from "./Routers/RouterPage.js";
import { AdminPage } from "./Routers/AdminPage.js";
import { UserPage } from "./Routers/UserPage.js";
import { ProductsPage } from "./Routers/Products.js";
import { isAuth, isAuthUser } from "./Helper/isAuth.js";
import { CartPage } from "./Routers/CartPage.js";
import { OrdersPage } from "./Routers/BuyProducts.js";

const app = express();
const { PORT } = process.env;

await db_connection();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", RouterPage);
app.use("/admin", AdminPage);
app.use("/user", UserPage);
app.use("/products", isAuth, ProductsPage);
app.use("/orders", isAuth, OrdersPage);
app.use("/cart", isAuthUser, CartPage);

app.listen(PORT, () => console.log("Listning in port :", PORT));