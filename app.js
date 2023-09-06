import express from "express"; 
import erroHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import connectDB from "./config/conn.js";
import userContact from "./routes/userContact.js";
import userRoute from "./routes/userRoute.js";
dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(erroHandler);
app.use("/api/contact", userContact );
app.use("/api/user", userRoute);




app.listen(port, ()=>{
    console.log(`app listening at ${port}`)
});