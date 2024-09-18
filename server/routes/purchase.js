import express from "express";
import { addPurchase, getAdminPurchase, getUserPurchase} from "../controllers/purchase.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, addPurchase);
router.post("/admin/:page", verifyToken, getAdminPurchase);
router.get("/user/:email",verifyToken, getUserPurchase);

export default router;



