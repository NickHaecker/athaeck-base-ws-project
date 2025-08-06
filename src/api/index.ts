import config from "config"
import { BaseExpressRouteFactory } from "../../athaeck-express-nosql-extension/athaeck-express-base/base/express"

export class MongoDBRouteFactory extends BaseExpressRouteFactory {

    constructor(root: string) {
        super(root)
    }
    protected CreateRouts(): void {
        const routes: any[] = []

        const extensions: any = config.get("extensions")
        const extensionRoutes = extensions["mongoDB"]
        for (const extension of extensionRoutes) {
            const Route = require(`${this.rootFolder + extension}`)
            if (!Route) {
                break;
            }
            routes.push(Route)
        }

        this.AddRoute(routes)
    }

}