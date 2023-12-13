import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDTO, UpdateJobDTO } from "./dto";

@Controller("jobs")
export class JobController{

    constructor(private readonly jobService:JobService){}
    @Post()
    create(@Body() createJobDto:CreateJobDTO){
        return this.jobService.create(createJobDto)
    }

    @Get()
    findAll(){
        return this.jobService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.jobService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateJobDto:UpdateJobDTO){
        return this.jobService.update(id,updateJobDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.jobService.remove(id)
    }
}