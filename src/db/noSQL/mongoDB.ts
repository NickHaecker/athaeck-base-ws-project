import { MongoClient, Db } from "mongodb";
import config from "config";
import { BaseDB } from "../../../athaeck-express-nosql-extension/base/db/types";
class MongoDB extends BaseDB {
    private _url: string
    constructor() {
        super();
        console.log("Init MongoDB Adapter")
        const nosql: any = config.get("noSQL");
        this.config = nosql["mongoDB"]
        const url: string = <string>this.config["url"];
        this._url = url.replace("<password>", this.config.password)

        if (!this.UseDB()) {
            return;
        }
    }

    private UseDB(): boolean {
        return this.config.useDB
    }

    public async Connect(): Promise<void> {
        if (!this.UseDB()) {
            return;
        }
        if (this._url.length === 0) {
            return
        }

        this.client = await MongoClient.connect(this._url)
    }
    public async GetDB<T>(db: string): Promise<T | undefined> {
        await this.Connect();
        return await this.client?.db(db);
    }
}
module.exports = MongoDB;