import {
  BaseExpressRoute,
  BaseExpressRouter,
  ExpressRouteType,
} from "../athaeck-express-base/base/express";
import { BaseDB } from "./db/types";
import path from "path";

export abstract class BaseNoSQLExpressRouteExtension extends BaseExpressRoute {
  protected db: any | undefined;
  abstract dbName: string;

  constructor(route: string, routeType: ExpressRouteType) {
    super(route, routeType);
  }

  public async TakeRouter(router: BaseNoSQLExpressRouterExtension): Promise<void> {
    super.TakeRouter(router);
    this.db = await router.Plattform?.GetDB(this.dbName);
  }
}

export abstract class BaseNoSQLExpressRouterExtension extends BaseExpressRouter {
  protected plattform: BaseDB | undefined;
  protected noSQLFactory: BaseNoSQLFactory;
  abstract noSQLName: string;

  constructor() {
    super();
    this.Init();
    this.CreatePlattform();

  }
  protected abstract Init(): void;
  public get Plattform() {
    return this.plattform;
  }

  protected CreatePlattform(): void {
    this.plattform = this.noSQLFactory.CreateNoSQL(this.noSQLName);
  }
}

export abstract class BaseNoSQLFactory {
  protected rootFolder: string;
  protected rootDir: string;
  constructor(root: string) {
    this.rootFolder = root;
  }
  public CreateNoSQL(name: string): BaseDB | undefined {
    const pathTo: string = path.join(this.rootDir + this.rootFolder + name);
    const NoSQL = require(pathTo);
    const db: BaseDB = new NoSQL();
    if (!db) {
      return undefined;
    }
    return db;
  }
}
