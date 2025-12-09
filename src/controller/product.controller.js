import * as productService from '../services/product.service.js';

export const getProducts = async (req,res)=>{
    try{
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({msj:"Error al obtener todos los productos",error: err.msj});

    }
};

export const getProductById = async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await productService.getProductById(id);
        if(!product){
            return res.status(404).json({msj:"Producto con id ${id} no encontrado"});
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({msj:"Error al obtener producto por id",error: err.msj});

    }      
};

export const createProduct = async (req,res)=>{
    try{
        
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({msj:"Producto credo con éxito", producto: newProduct});
    }
    catch(err){
        res.status(400).json({msj:"Error al crear un nuevo producto", error: err.message});

    }  
};

export const deleteProductById= async (req, res) => {
    try{
        const {id} = req.params;
        const deleted = await productService.deleteProduct(id);

        if(!deleted){
            return res.status(404).json({msj:"No se encontro el prducto a eliminar"});
        }
        res.status(200).json({mjs:"Producto eliminado correctamente"});
    }
    catch(err){
        res.status(500).json({msj:"Error al eliminar el producto",error: err.message});
    }
};

export const updateProductById = async (req,res) => {
     try{
        const {id} = req.params;
        const updated = await productService.updateProduct(id, req.body);

        if(!updated){
            return res.status(404).json({msj:"No se encontro el prducto a actualizar"});
        }
        res.status(200).json({mjs:"Producto actualizado correctamente"});
    }
    catch(err){
        res.status(500).json({msj:"Error al actualizar el producto",error: err.message});
    }
};