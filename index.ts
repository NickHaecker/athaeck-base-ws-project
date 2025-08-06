import { WebSocket } from "ws";
import {
  AddRoute,
  BaseExpressRoute,
} from "./athaeck-websocket-express-base/athaeck-express-base/base/express";
import { BaseWebSocketExpressAdoon } from "./athaeck-websocket-express-base/base";
import { WebSocketHooks } from "./athaeck-websocket-express-base/base/hooks";
import {
  ServerAdapterFactory,
  SocketListenerFactory,
} from "./src";
import bodyParser from "body-parser";
import config from "config"
import axios, { AxiosRequestConfig } from "axios";


export class Socket extends BaseWebSocketExpressAdoon {
  private _baseSessionApiEndpoint: string = "/api/mongoDB/data/sessions"

  constructor(port: number) {
    super(port);

    this.factory = new SocketListenerFactory("./listener/");
    this.initializeMiddleware();
    this.apiFactory = new ServerAdapterFactory("./api/");
    this.apiFactory.ConnectAdpater(this);
  }

  protected ServerClosed(): void {
  }

  protected ValidateConnection(webSocket: WebSocket): boolean {
    return true;
  }

  Init(webSocket: WebSocket, hooks: WebSocketHooks): void { }

  protected CreateHooks(): WebSocketHooks {
    return new WebSocketHooks();
  }
  Disconnect(webSocket: WebSocket): WebSocketHooks | undefined {
    return undefined
  }


  AddRoute(route: BaseExpressRoute): void {
    this.app = AddRoute(this.app, route);
  }
  initializeMiddleware(): void {
    this.app.use(bodyParser.json());
  }

  Start(): void {
    super.Start()


  }
}

export const socket: Socket = new Socket(8080);
socket.Start();
