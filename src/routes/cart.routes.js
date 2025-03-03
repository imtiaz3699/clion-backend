import express from 'express';
import { addRemoveFromCart, getCart, removeFromCart } from '../controller/cart.controller.js';
import { authenticateJWT } from '../middleware/authenticate.js';

const router = express.Router();
router.post("/add-to-cart",authenticateJWT, addRemoveFromCart);
router.put("/remove-from-cart",authenticateJWT, removeFromCart);
router.get("/get-cart",authenticateJWT,getCart);
export default router;