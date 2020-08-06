import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionController {
  async index(request: Request, response: Response) {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.json(total);
  }

  async create(request: Request, response: Response) {
    const { user_id: userId } = request.body;

    const [createdConnectionId] = await db('connections').insert({
      user_id: userId,
    });

    const createdConnection = await db('connections').where(
      'id',
      createdConnectionId
    );

    return response.status(201).json(createdConnection);
  }
}
