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
export const ordercontroller = {
    
    createOrder
    
}