import { Request, Response } from 'express';
import db from '../database/connection';

export default class UserController {
  async index(request: Request, response: Response) {
    const users = await db('users').select('*');

    return response.json(users);
  }

  async show(request: Request, response: Response) {}
}
