import { Request, Response } from "express"
import ProductModel from "../products/product-model"
import { orderServise } from "./order-servise"
import orderValidationSchema from "./order.joi-validation"

const createOrder = async (req: Request, res:Response) => {
    try{
        const Order = req.body
        const {value, error} = await orderValidationSchema.validate(Order)
      if(error){
            res.status(500).json({
                success: false,
                message: 'something is wrong joi valadation ',
                error: error
               
            })
            return
        }
     const product = await ProductModel.findById(value.productId)
    
     
     if (!product) {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
        return;
    } if (product.inventory.quantity < value.quantity) {
        res.status(400).json({
            success: false,
            message: 'Insufficient stock'
        });
        return;
    }
    product.inventory.quantity = product.inventory.quantity - value.quantity
    if(product.inventory.quantity > 0 ){
    product.inventory.inStock = true
    }else{
        product.inventory.inStock = false
    }
    await product.save()
    const result = await orderServise.orderCreateIntoDB(value)
    res.status(200).json({
        success: true,
        message: 'order create succesfully !!',
        data: result 
    })
    
 


    }catch(err){
        res.status(500).json({
            success: false,
            message: 'something is wrong  ',
            error: err
        })
    }
}
   // get order 
   const getAllOrder = async  (req:Request, res:Response) => {
    try{
       const {email} = req.params
       let result
       if(email){
         result = await orderServise.getEmailOnProductDB(email) 
         res.status(200).json({
            success: true,
            message: 'Get Email product find  succesfully !!',
            data: result 
        })
       }else{
        result = await orderServise.GetAllOrderDB()
            res.status(200).json({
            success: true,
            message: 'Get all Product succesfully !!',
            data: result 
        })
       }
  
      
    }catch(err){
     res.status(500).json({
         success: false,
         message: 'something is wrong ,, get not order ',
         error: err
     })
 }
}


export const ordercontroller = {
    getAllOrder,
    createOrder
    
}