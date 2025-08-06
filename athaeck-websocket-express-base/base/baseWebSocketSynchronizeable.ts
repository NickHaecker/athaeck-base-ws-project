
import { BaseWebSocketExpressAdoon } from '.';
import { WebSocket } from "ws"
import { BaseWebSocketComponent } from './baseWebSocketComponent';
import { SynchronizableHooks, WebSocketHooks } from './hooks';
import { SynchronizableComponent } from './takeListener';

export enum SynchronizableTypes {
    SHOP = "SHOP"
}

export abstract class BaseWebSocketSynchronizeable {
    protected components: SynchronizableComponent[] = []
    protected synchronizableHooks: SynchronizableHooks
    protected type: SynchronizableTypes

    constructor() {
        this.synchronizableHooks = new SynchronizableHooks()

    }
    public TakeBaseWebSocketExpressAdoon(addon: BaseWebSocketExpressAdoon): void {

        addon.WSHooks.SubscribeHookListener(SynchronizableHooks.TAKE_SYNCHRONIZABLE_COMPONENT, this.OnTakeSynchronizableComponent)
        addon.WSHooks.SubscribeHookListener(SynchronizableHooks.REMOVE_SYNCHRONIZABLE, this.OnRemoveSynchronizableComponent)
    }
    public RemoveBaseWebSocketExpressAdoon(addon: BaseWebSocketExpressAdoon): void {

        addon.WSHooks.UnSubscribeListener(SynchronizableHooks.TAKE_SYNCHRONIZABLE_COMPONENT, this.OnTakeSynchronizableComponent)
        addon.WSHooks.UnSubscribeListener(SynchronizableHooks.REMOVE_SYNCHRONIZABLE, this.OnRemoveSynchronizableComponent)
    }

    public OnTakeSynchronizableComponent = (component: SynchronizableComponent): void => {
        component.TakeSynchronizable(this)
    }
    public OnRemoveSynchronizableComponent = (component: SynchronizableComponent): void => {
        component.RemoveSynchronizable(this)
    }

    public get SynchronizableHooks(): SynchronizableHooks {
        return this.synchronizableHooks
    }

    public get Type(): SynchronizableTypes {
        return this.type
    }
}