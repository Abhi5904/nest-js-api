import { Module } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./jobs.controller";
import { UserModule } from "src/users/user.module";

@Module({
    imports: [UserModule],
    providers: [JobService],
    controllers:[JobController],
    exports:[]
})
export class JobModule { }