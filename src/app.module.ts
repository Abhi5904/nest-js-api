import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './mongoose-config/mongoose-config.module';
import { UserModule } from './users/user.module';
import { JobModule } from './jobs/job.module';
import { MongooseModelsModule } from './schemas/mongoose-model.module';
import { StudentsModule } from './students/students.module';
import { EmployersModule } from './employers/employers.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DataBaseModule,
    JobModule,
    UserModule,
    MongooseModelsModule,
    StudentsModule,
    EmployersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}