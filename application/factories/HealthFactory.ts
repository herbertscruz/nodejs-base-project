import { Router } from "express";
import { IFactory } from "../../configuration/IFactory";
import { HealthController } from "../resources/HealthController";

export class HealthFactory implements IFactory {

    createResource(): Router {
        const resource = new HealthController;
        return resource.getRoute();
    }
}
