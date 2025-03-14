import express from 'express';
import { addRemoveFromCart, getCart, removeFromCart, updateCart } from '../controller/cart.controller.js';
import { authenticateJWT } from '../middleware/authenticate.js';

const router = express.Router();
router.post("/add-to-cart",authenticateJWT, addRemoveFromCart);
router.delete("/remove-from-cart/:id",authenticateJWT, removeFromCart);
router.get("/get-cart",authenticateJWT,getCart);
router.put("/update-cart/:id",authenticateJWT,updateCart);
export default router;