import { Request, Response } from "express";
import { productServise } from "./product-servise";
import productValidationSchema from "./product-validation";
import orderValidationSchema from "../orders/order.joi-validation";
import ProductModel from "./product-model";

// create product
const createProduct = async (req: Request, res:Response) => {
    
      try{
        const Product = req.body
        const {value, error} = await productValidationSchema.validate(Product)
        if(error){
            res.status(500).json({
                success: false,
                message: 'something is wrong joi valadation ',
                error: error
               
            })
            return
        }
        const result = await productServise.productCreateIntoDB(value)
        res.status(200).json({
            success: true,
            message: 'Product create succesfully !!',
            data: result 
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'something is wrong ',
            error: err
        })
    }
}

const getALLProduct = async (req:Request, res:Response) => {
        try{
            const { searchTerm } = req.query;
     
            
            let result 
            if(searchTerm){
                result = await productServise.searchProductDB(searchTerm as string)
            } else{
                result = await productServise.getAllProductDB()
            }
            res.status(200).json({
            success: true,
            message: 'Get all Product succesfully !!',
            data: result 
        })
        }
        catch(err){
            res.status(500).json({
                success: false,
                message: 'something is wrong by search ',
                error: err
            })
        }
        
    }
// get Single Product

const getSingleProduct = async (req:Request, res:Response) => {
    try{
      const {productId} = req.params 
      const result = await productServise.getSingleProductDB(productId)
      res.status(200).json({
        success: true,
        message: 'Get single Product succesfully !!',
        data: result 
    })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'something is wrong ',
            error: err
        })
    }
}
// update product 
const updateProduct = async (req:Request, res:Response) => {
    try{
        const {productId} = req.params
        const updateData = req.body
        const {value, error } = await productValidationSchema.validate(updateData)
        if(error){
            if(error){
                res.status(500).json({
                    success: false,
                    message: 'something is wrong joi valadation ',
                    error: error
                   
                })
                return
            }
        }
        const result = await productServise.updateProductDB(productId,value)
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: result
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'something is wrong ',
            error: err
        })
    }

}
   
const deleteProduct = async (req:Request, res:Response) => {

    try{
        const {productId} = req.params
        const result = await productServise.deleteProductDB(productId)
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: result
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'something is wrong in deleting  ',
            error: err
        })
    }
}



export const Productcontroller = {
    createProduct,
    getALLProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct

}