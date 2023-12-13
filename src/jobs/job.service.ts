import { UserService } from './../users/user.service';
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ACCOUNT_TYPE } from 'src/constants';
import { JOB_MODEL, JobDocument } from "src/schemas/job";
import { CreateJobDTO, UpdateJobDTO } from './dto';

@Injectable()
export class JobService {
    constructor(@InjectModel(JOB_MODEL) private readonly jobModel: Model<JobDocument>, private readonly usersService: UserService) { }

    async create(createJobDto: CreateJobDTO) {
        const user = await this.usersService.findOne(createJobDto.userId)
        if (!user) {
            throw new NotFoundException('user not found')
        } else if (user.accountType !== ACCOUNT_TYPE.EMPLOYER) {
            throw new ForbiddenException("only employer can create job")
        }
        const createdJob = await this.jobModel.create({ ...createJobDto, employer: createJobDto.userId });
        return createdJob
    }

    async findAll() {
        const job = await this.jobModel.find()
        return job;
    }

    async findOne(id: string) {
        const job = await this.jobModel.findById(id)
        if (!job) {
            throw new NotFoundException('Job not found')
        }
        return job
    }

    async update(id: string, updateJob: UpdateJobDTO) {
        const updatedJob = await this.jobModel.findByIdAndUpdate(id, updateJob, { new: true })
        if (!updatedJob) {
            throw new NotFoundException('Job not found')
        }
        return updatedJob
    }

    async remove(id: string) {
        const removedJob = await this.jobModel.findByIdAndDelete(id)
        if (!removedJob) {
            throw new NotFoundException('Job not found')
        }
        return { _id: id }
    }
}