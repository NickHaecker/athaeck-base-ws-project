
import { WebSocket } from "ws"
import { BaseWebSocketExpressAdoon } from "."
import { WebSocketHooks } from "./hooks"
import { GetGUID } from "./helper"

export abstract class BaseWebSocketComponent {
    private _id: string = ""
    protected socket: WebSocket
    protected hooks: WebSocketHooks

    // private _listener: TakeListener[] = []


    constructor(socket: WebSocket, hooks: WebSocketHooks) {
        this.socket = socket
        this.hooks = hooks
        this._id = GetGUID(`{{id}}-{{id}}`)
    }

    public get Socket(): WebSocket {
        return this.socket
    }
    public get Hooks(): WebSocketHooks {
        return this.hooks
    }
    // public TakeWebSocketServer(webSocketServer: BaseWebSocketExpressAdoon): void {
    //     this.server = webSocketServer
    // }
    // public abstract BeforeDestroy(): void;
    public get ID(): string {
        return this._id
    }

    public TakeBaseWebSocketExpressAdoon(addon: BaseWebSocketExpressAdoon): void {

    }
    public RemoveBaseWebSocketExpressAdoon(addon: BaseWebSocketExpressAdoon): void {

    }


    // public TakeListener(listener: TakeListener): void {
    //     this._listener.push(listener)
    // }
    // public RemoveListener(listener: TakeListener): void {
    //     this._listener = this._listener.filter((l: TakeListener) => l != listener)
    // }

    // public TakeWebSocketConnector(connector: BaseWebSocketConnector): void {
    //     for (const listener of this._listener) {
    //         listener.TakeConnector(connector)
    //     }
    // }
    // public RemoveWebSocketConnector(connector: BaseWebSocketConnector): void {
    //     for (const listener of this._listener) {
    //         listener.RemoveConnector(connector)
    //     }
    // }
}