import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updatedCategory,
} from "../controller/category.controller.js";
const router = express.Router();
router.post("/create-category", createCategory);
router.put("/update-category/:id", updatedCategory);
router.delete("/delete-category/:id", deleteCategory);
router.get("/get-category", getCategory);
export default router;
