import express from "express";
import { addProduct,getProducts,updateProduct,deleteProduct  } from "../controller/product.controller.js";
import {authenticateJWT} from "../middleware/authenticate.js";
const router = express.Router();

router.post('/create-product',authenticateJWT, addProduct);
router.put('/update-product/:id',authenticateJWT, updateProduct);
router.get('/get-products',authenticateJWT,getProducts)
router.delete('/delete-products/:id',authenticateJWT,deleteProduct)
export default router