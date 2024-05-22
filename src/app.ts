import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRouter } from "./app/modules/products/product-route";
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api/products',productRouter)
app.get("/", (req: Request, res: Response) => {
 res.send('Server is Runing !!');
});

export default app;
