import { BaseNoSQLFactory } from "../../athaeck-express-nosql-extension/base";


export class NoSQLFactory extends BaseNoSQLFactory {
    constructor(root: string) {
        super(root)
        this.rootDir = __dirname
    }
}