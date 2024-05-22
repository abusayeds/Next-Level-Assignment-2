import Joi from "joi";
import { TProduct } from "./product-interface";

const productValidationSchema = Joi.object<TProduct>({
    name: Joi.string()
    .pattern(/^[A-Z][a-zA-Z0-9\s]*$/)
    .required()
    .messages({
        'string.pattern.base': 'Name must start with an uppercase letter.',
    }),
    description: Joi.string().required(),
    price: Joi.number().required().strict().messages({
        'number.base': 'Price must be a number'
    }),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    variants: Joi.array().items(
      Joi.object({
        type: Joi.string().required(),
        value: Joi.string().required(),
      })
    ).required(),
    inventory: Joi.object({
      quantity: Joi.number().required(),
      inStock: Joi.boolean().required(),
    }).required(),
  });
  
  export default productValidationSchema;