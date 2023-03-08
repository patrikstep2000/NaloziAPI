import express from 'express'
import healthRouter from './routes/health';
import orderRouter from './routes/OrderRoutes';
import clientRouter from './routes/ClientRoutes';
import printerRouter from './routes/PrinterRoutes';
import userRouter from './routes/UserRoutes';
import authRouter from './routes/AuthRoutes';
import materialRouter from './routes/MaterialRoutes';
import cors from 'cors';

const corsOption = {
    origin: "*",
};

const application = () => {

    const app = express();

    app.use(express.json());
    
    app.use(express.urlencoded());

    app.use(cors(corsOption));

    app.use(healthRouter);

    app.use(orderRouter);

    app.use(clientRouter);

    app.use(printerRouter);

    app.use(userRouter);

    app.use(authRouter);

    app.use(materialRouter);
    
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })
}

export default application;