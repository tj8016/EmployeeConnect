import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import postRoutes from "./routers/postRoutes.js";

dotenv.config({ path: "./config/config.env" });
const app = express();
const Port = process.env.PORT;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
connectDB();
//set up cloudinary
// enable CORS - Cross Origin Resource Sharing
app.use(cors({ origin: true }));

// middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.raw({ limit: "50mb" }));

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

/************************** user and expense routes *************************/
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(Port, () => {
  console.log(`server is running at port ${Port}`);
});
