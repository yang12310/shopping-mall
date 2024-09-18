import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js";
import purchaseRoutes from "./routes/purchase.js";
import adminRoutes from "./routes/admin.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
//아래는 middleware를 사용
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); 
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.use("/products",productRoutes)
app.use("/auth", authRoutes);
app.use("/purchase/", purchaseRoutes);
app.use("/admin", adminRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3500;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));