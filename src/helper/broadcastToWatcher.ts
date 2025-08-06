import { Player } from "../data/player";
import { Watcher } from "../data/watcher";

export function BroadcastToWatcher(watcher:Watcher[],hookName:string,player:Player):void{
    for(const w of watcher){
        w.hooks.DispatchHook(hookName,player)
    }
}