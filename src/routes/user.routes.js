
import express from "express";
import { createUser, loginUser, updateUser,getUser,updatePassword, refreshToken } from "../controller/user.controller.js";
import { authenticateJWT } from "../middleware/authenticate.js";

const router = express.Router();

router.post('/create-user', createUser);
router.put('/update-user/:id',authenticateJWT, updateUser);
router.post('/login', loginUser);
router.get('/get-user',authenticateJWT, getUser);
router.put('/update-password/:id',authenticateJWT, updatePassword);
router.get('/get-refresh-token',authenticateJWT, refreshToken);
export default router