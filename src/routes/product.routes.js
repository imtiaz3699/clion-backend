import express from "express";
import { addProduct,getProducts,updateProduct,deleteProduct  } from "../controller/product.controller.js";
import {authenticateJWT} from "../middleware/authenticate.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post('/create-product',authenticateJWT,upload.fields([{name:'product_img',maxCount:5}]), addProduct);
router.put('/update-product/:id',authenticateJWT, updateProduct);
router.get('/get-products',getProducts)
router.delete('/delete-products/:id',authenticateJWT,deleteProduct)
export default router