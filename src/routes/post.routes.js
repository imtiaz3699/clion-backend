import express from "express";
import { createPost,getPosts } from "../controller/post.controller.js";
import {authenticateJWT} from "../middleware/authenticate.js";
const router = express.Router();

router.post('/create-post',authenticateJWT, createPost);
router.get('/get-all-posts',authenticateJWT, getPosts);
export default router