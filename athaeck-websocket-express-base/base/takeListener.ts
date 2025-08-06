// import { BaseWebSocketExpressAdoon } from ".";

import { BaseWebSocketSynchronizeable } from "./baseWebSocketSynchronizeable";

// export interface PassBaseWebSocketExpressAddon {
//     TakeBaseWebSocketExpressAdoon(addon: BaseWebSocketExpressAdoon): void;
//     RemoveBaseWebSocketExpressAdoon(addon: BaseWebSocketExpressAdoon): void;
// }

export interface SynchronizableComponent {

    TakeSynchronizable(baseSynchronizable: BaseWebSocketSynchronizeable): void;
    RemoveSynchronizable(baseSynchronizable: BaseWebSocketSynchronizeable): void
}