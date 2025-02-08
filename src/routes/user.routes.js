
import express from "express";
import { createUser, loginUser, updateUser,getUser,updatePassword } from "../controller/user.controller.js";
import { authenticateJWT } from "../middleware/authenticate.js";

const router = express.Router();

router.post('/create-user', createUser);
router.put('/update-user/:id',authenticateJWT, updateUser);
router.post('/login', loginUser);
router.get('/get-user',authenticateJWT, getUser);
router.put('/update-password/:id',authenticateJWT, updatePassword);
export default router