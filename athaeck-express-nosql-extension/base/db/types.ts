export abstract class BaseDB {
    constructor() {

    }
    protected config: any
    protected client: any

    abstract Connect(): Promise<void>;
    abstract GetDB<T>(db: string): Promise<T | undefined>;
}