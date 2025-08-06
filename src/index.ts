import { BaseExpressApiFactory } from "../athaeck-websocket-express-base/athaeck-express-base/base/express";
import { WebSocketListenerFactory } from "../athaeck-websocket-express-base/base";
import { StandardWebSocketDistributor } from "../athaeck-websocket-express-base/base/helper";
import config from "config"



export class SocketListenerFactory extends WebSocketListenerFactory {
    constructor(root: string) {
        super(root)
    }

    protected TakeListener(): void {
        const listener: any[] = [
            StandardWebSocketDistributor
        ]

        const refs: string[] = config.get("listener") as string[]
        for (const ref of refs) {
            const listenerRef = require(`${this.rootFolder + ref}`)
            if (!listenerRef) {
                break;
            }
            listener.push(listenerRef)
        }

        this.AddListener(listener)
    }
}

export class ServerAdapterFactory extends BaseExpressApiFactory {
    constructor(root: string) {
        super(root)
    }

    protected CreateAdapter(): void {
        const adapter: any[] = []

        const refs: string[] = config.get("adapter") as string[]
        for (const ref of refs) {
            const adpterRef = require(`${this.rootFolder + ref}`)
            if (!adpterRef) {
                break;
            }
            adapter.push(adpterRef)
        }

        this.AddAdapter(adapter)
    }
}