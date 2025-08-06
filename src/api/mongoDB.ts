import { MongoDBRouteFactory } from ".";
import { AddRoute, BaseExpressRoute } from "../../athaeck-express-nosql-extension/athaeck-express-base/base/express";
import { BaseNoSQLExpressRouterExtension } from "../../athaeck-express-nosql-extension/base";

import { NoSQLFactory } from "../db";


class MongoDBRouter extends BaseNoSQLExpressRouterExtension {
    noSQLName: string
    path: string
    adapter: string

    constructor() {
        super()
        this.path = "/api/mongoDB"
        this.adapter = "mongoDbRouter"
        this.Log()

        this.routeFactory = new MongoDBRouteFactory("./mongoDB/")
        this.routeFactory.ConnectRoutes(this)
    }

    protected async Init(): Promise<void> {
        this.noSQLName = "mongoDB"
        this.noSQLFactory = new NoSQLFactory("/noSQL/")
    }


    AddRoute(route: BaseExpressRoute): void {
        this.app = AddRoute(this.app, route)
    }


}

module.exports = MongoDBRouter