import express from "express";
import { createOrder, getOrders, updateOrder } from "../controller/order.controller.js";
const router = express.Router();
router.post('/create-order',createOrder)
router.put('/update-order/:id',updateOrder)
router.get('/get-all-orders',getOrders)
export default router;