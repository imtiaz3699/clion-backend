
import express from "express";
import { createUser, loginUser, updateUser,getUser } from "../controller/user.controller.js";
import { authenticateJWT } from "../middleware/authenticate.js";

const router = express.Router();

router.post('/create-user', createUser);
router.put('/update-user/:id',authenticateJWT, updateUser);
router.post('/login', loginUser);
router.get('/get-user',authenticateJWT, getUser);
export default router