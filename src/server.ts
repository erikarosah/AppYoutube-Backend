import "express-async-errors";
import "dotenv/config";
import AppError from "./utils/AppError";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import routes from "./routes";

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
})
app.use(cors())
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: Function) => {
    if( err instanceof AppError){
        return res.status(err.statusCode).json({
            status:"Error",
            message: err.message
        })
    }

    console.log(err)
    
    return res.status(500).json({
        status:"Error",
        message:"Internal server error"
    })
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))