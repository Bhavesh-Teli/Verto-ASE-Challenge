import { Application, Request, Response, Router } from 'express';
import product from './productRoutes';
import stock from './stockRoutes';

const routes = (app: Application) => {
    const router: Router = Router();
    router.use('/products', product);
    router.use('/stock', stock);
    router.use("/*", (req: Request, res: Response) => {
        res.status(404).send("Not found");
    });
    app.use("/api", router);
};

export default routes;