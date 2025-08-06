import { EventEmitter } from "events"

export class WebSocketHooks extends EventEmitter {
    public static readonly NEW_CONNECTION = "NEW_CONNECTION"
    public static readonly TAKE_SYNCHRONIZABLE = "TAKE_SYNCHRONIZABLE"
    public static readonly REMOVE_SYNCHRONIZABLE = "REMOVE_SYNCHRONIZABLE"

    private listenerCountMap: { [key: string]: number } = {};

    public DispatchHook(hook: string, body: any) {
        this.emit(hook, body)
    }
    public SubscribeHookListener(hook: string, listener: (data: any) => void) {
        if (!this.listenerCountMap[hook]) {
            this.listenerCountMap[hook] = 0;
        }

        this.listenerCountMap[hook]++;
        this.setMaxListeners(this.listenerCountMap[hook] + 1);
        this.on(hook, listener);
    }
    public UnSubscribeListener(hook: string, listener: (data: any) => void) {
        if (this.listenerCountMap[hook]) {
            this.listenerCountMap[hook]--;
            this.setMaxListeners(this.listenerCountMap[hook] + 1);
        }

        this.removeListener(hook, listener)
    }
}

export type SynchronizableEventBody = {
    type: string
    body: any
}

export class SynchronizableHooks extends WebSocketHooks {
    public static readonly UPDATE_DATA = "UPDATE_DATA"
    public static readonly TAKE_SYNCHRONIZABLE_COMPONENT = "TAKE_SYNCHRONIZABLE_COMPONENT"
    public static readonly REMOVE_SYNCHRONIZABLE_COMPONENT = "REMOVE_SYNCHRONIZABLE_COMPONENT"

    private _wildcardListener: Array<(data: SynchronizableEventBody) => void> = []

    public DispatchHook(hook: string, body: SynchronizableEventBody): void {
        super.DispatchHook(hook, body as any)

        this._wildcardListener.forEach(wL => wL(body))
    }

    public SubscribeWildcardListener(listener: (data: SynchronizableEventBody) => void): void {
        this._wildcardListener.push(listener)
    }
    public UnSubscribeWildcardListener(listener: (data: SynchronizableEventBody) => void): void {
        this._wildcardListener = this._wildcardListener.filter(l => l !== listener);
    }
}