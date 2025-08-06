import { WebSocket } from "ws"
import { ReceivedEvent } from "../../athaeck-websocket-express-base/base/helper"
import { ConnectingMindsEvents } from "../../Connecting-Minds-Data-Types/types"

export function EmitSessionNetworkError(websocket: WebSocket): void {
    const sessionMissing: ReceivedEvent = new ReceivedEvent(ConnectingMindsEvents.MISSING)
    sessionMissing.addData("Message", "Es ist ein Netzwerk Fehler aufgetreten.")
    websocket.send(sessionMissing.JSONString)
}