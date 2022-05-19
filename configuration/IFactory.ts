import { Router } from 'express';

export interface IFactory {
  createResource: () => Router;
}
