import { Router } from "express";

export interface IResource {
    getRoute: () => Router
}