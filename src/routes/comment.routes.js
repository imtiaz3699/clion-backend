import express from "express";
import { createComment,getComment } from "../controller/comment.controller.js";

const router = express.Router();

router.post('/create-comment', createComment);
router.get('/get-comments', getComment);
export default router