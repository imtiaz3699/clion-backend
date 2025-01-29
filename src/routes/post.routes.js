import express from "express";
import { createPost,getPosts } from "../controller/post.controller.js";

const router = express.Router();

router.post('/create-post', createPost);
router.get('/get-all-posts', getPosts);
export default router