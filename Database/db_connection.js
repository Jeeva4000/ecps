import "dotenv/config";
import mongoose from "mongoose";

const db_connection = async () => {
    await mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB Connected"))
        .catch((error) => console.log("DB Error ", error));
};
export { db_connection };