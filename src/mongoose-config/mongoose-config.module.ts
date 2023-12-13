import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { DataBaseService } from "./mongoose-config.service";

@Module({
     imports:[
        MongooseModule.forRootAsync({
            useClass:DataBaseService
        })
     ],
     exports:[MongooseModule]
})
export class DataBaseModule{}