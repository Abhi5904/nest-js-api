import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { USER_MODEL, UserSchema } from "./user";
import { JOB_MODEL, JobSchema } from "./job";
import { STUDENT_MODEL, StudentSchema } from "./student";
import { EMPLOYER_MODEL, EmployerSchema } from "./employer";

const MODEL = [
    {
        name: USER_MODEL, schema: UserSchema, discriminators: [
            { name: STUDENT_MODEL, schema: StudentSchema },
            { name: EMPLOYER_MODEL, schema: EmployerSchema }
        ]
    },
    { name: JOB_MODEL, schema: JobSchema }
]
@Global()
@Module({
    imports: [MongooseModule.forFeature(MODEL)],
    exports: [MongooseModule]
})
export class MongooseModelsModule { }