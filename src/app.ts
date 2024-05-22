import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { productRouter } from "./app/modules/products/product-route";
import { OderRouter } from "./app/modules/orders/order-router";
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api/products',productRouter)
app.use('/',OderRouter)


app.get("/", (req: Request, res: Response) => {
 res.send('Server is Runing !!');
});

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
   
    res.status(500).json({
        "success": false,
        "message": "Route not found"
       });
    next()
});

export default app;
