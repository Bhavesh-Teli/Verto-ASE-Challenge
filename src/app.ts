import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes/index';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'))

routes(app);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Server is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    throw error;
});


export default app;