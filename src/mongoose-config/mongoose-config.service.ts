import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"

@Injectable()
export class DataBaseService implements MongooseOptionsFactory {
    constructor(private config: ConfigService) { }
    createMongooseOptions():MongooseModuleOptions
        {
        const mongodb_uri = this.config.get<string>("MONGODB_URI")
        return {
            uri: mongodb_uri
        }
    }
}