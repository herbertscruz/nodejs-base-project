import { Router } from 'express';
import cors from 'cors';

export function expressCors(): Router {
    const router = Router();

    router.use(cors());

    return router;
}