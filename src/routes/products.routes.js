import express from 'express';
import {getProducts, getProductById,createProduct,deleteProductById,updateProductById } from '../controller/product.controller.js';


const router = express.Router();


//        ruta   callback
router.get('/',getProducts);
router.get('/:id',getProductById);

router.post('/crear',createProduct);
router.put('/:id',updateProductById);
router.delete('/:id',deleteProductById);

export default router;