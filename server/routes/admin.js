import express from "express";
import { addDelivery } from "../controllers/admin.js";
import { deleteDelivery } from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.patch("/delivery/:purchaseId", verifyToken , addDelivery);
router.delete("/delete/:purchaseId", verifyToken , deleteDelivery);


export default router;



