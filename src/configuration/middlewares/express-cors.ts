import { RequestHandler } from 'express';
import cors from 'cors';

export function expressCors(): RequestHandler {
  return cors();
}
