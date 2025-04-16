import express from 'express';
import { addRemoveFromCart, getCart, removeFromCart, updateCart } from '../controller/cart.controller.js';
import { authenticateJWT } from '../middleware/authenticate.js';

const router = express.Router();
router.post("/add-to-cart", addRemoveFromCart);
router.delete("/remove-from-cart/:id", removeFromCart);
router.get("/get-cart",getCart);
router.put("/update-cart/:id",updateCart);
export default router;