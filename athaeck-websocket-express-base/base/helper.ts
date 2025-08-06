import WebSocket from "ws";
import { BaseWebSocketExpressAdoon, BaseWebSocketHook, BaseWebSocketListener } from ".";
import { WebSocketHooks } from "./hooks";

export function GetGUID(pattern: string): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return pattern.replaceAll("{{id}}", s4())

}
export class ReceivedEvent {
    public eventName: string;
    public data: { [key: string]: any };

    constructor(name: string) {
        this.eventName = name;
        this.data = {};
    }

    public get JSONString(): string {
        return JSON.stringify(this)
    }

    public addData(key: string, value: any) {
        this.data[key] = value;
    }

    public getData(key: string): any {
        return this.data[key]
    }
}

export function Broadcast(WSS: WebSocket.Server, body: (client: WebSocket) => void) {
    for (let client of WSS.clients) {
        body(client)
    }
}

export class StandardWebSocketDistributor extends BaseWebSocketListener {

    listenerKey: string;

    constructor(webSocketServer: BaseWebSocketExpressAdoon, webSocket: WebSocket.WebSocket, hooks: WebSocketHooks) {
        super(webSocketServer, webSocket, hooks)

    }
    protected Init(): void {

    }
    protected SetKey(): void {
        this.listenerKey = BaseWebSocketHook.MESSAGE
    }

    protected listener(body: any) {
        const jsonBody = JSON.parse(body.toString());
        const event = jsonBody.hasOwnProperty("eventName") ? jsonBody["eventName"] : ""
        const data = jsonBody.hasOwnProperty("data") ? jsonBody["data"] : ""

        console.log(event)
        console.log(data)

        this.webSocket.emit(event, data)
    }
    public OnDisconnection(webSocket: WebSocket.WebSocket, hooks: WebSocketHooks): void {

    }
}
