import express from "express";
const router = express.Router();
import { addBannerProducts,updateBannerProducts,getBannerProducts,deleteBanner } from "../controller/banner.controller.js";
router.post("/create-banner", addBannerProducts);
router.put("/update-banner/:id", updateBannerProducts);
router.delete("/delete-banner/:id", deleteBanner);
router.get("/get-banner", getBannerProducts);
export default router;
