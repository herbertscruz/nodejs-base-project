import { Router } from "express";
import { IFactory } from "../../configuration/IFactory";
import { HelloWorldController } from "../resources/HelloWorldResource";

export class HelloWorldFactory implements IFactory {

    createResource(): Router {
        const resource = new HelloWorldController();
        return resource.getRoute();
    }
}
