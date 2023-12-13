import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO, LoginUserDTO, UpdateUserDto } from "./dto";

@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDTO) {
        return this.userService.create(createUserDto)
    }

    @Post("login")
    login(@Body() loginUserDto: LoginUserDTO) {
        return this.userService.login(loginUserDto)
    }

    @Get('search')
    searchFunction(@Query("name") query: Record<string, any>) {
        return this.userService.searchFunction(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }

}