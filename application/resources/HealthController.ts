import { Request, Response, Router } from "express";
import { IResource } from "../../configuration/IResource";

export class HealthController implements IResource {

    getRoute(): Router {
        const router = Router();
        router.get('/health', this.health);
        return router;
    }

    async health(req: Request, res: Response) {
        const data = {
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date().getTime(),
        };

        res.status(200).send(data);
    }
}