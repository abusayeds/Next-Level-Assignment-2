import Joi from 'joi';
import { Torder } from './order-interface';


const orderValidationSchema = Joi.object<Torder>({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    productId: Joi.string().messages({
        'string.empty': 'Product ID is required',
        'any.required': 'Product ID is required'
    }),
    price: Joi.number().required().messages({
     
        'string.empty': 'Price is required',
        'any.required': 'Price is required'
    }),
    quantity: Joi.number().required()
});

export default orderValidationSchema 
