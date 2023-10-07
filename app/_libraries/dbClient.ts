import {PrismaClient} from "@prisma/client";

export default class DBClient {
    private static client: PrismaClient;
    constructor() {
    }

    static get Instance(): PrismaClient{
        if(this.client === undefined){
            this.client = new PrismaClient();
        }

        return this.client;
    }
}