import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('messageClient', payload, client.id);
  }

  afterInit(server: Server): void {
    this.logger.log('Init');
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client Connected : ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected : ${client.id}`);
  }
}
