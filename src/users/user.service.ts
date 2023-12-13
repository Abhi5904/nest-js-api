import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserModel, USER_MODEL } from "src/schemas/user";
import { CreateUserDTO, LoginUserDTO, UpdateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(USER_MODEL) private readonly userModel: IUserModel ) { }

    async create(createUserDto: CreateUserDTO) {
        try {
            const user = await this.userModel.create(createUserDto);
            return user
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new BadRequestException(error.name)
            }
            throw new ServiceUnavailableException()
        }
    }

    async login(loginUserDto: LoginUserDTO) {
        const { email, password } = loginUserDto

        const user = await this.userModel.findByEmailAndPassword(email, password)

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }

    async findAll() {
        try {
            const user = await this.userModel.find()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.userModel.findById(id)
            if (!user) {
                throw new NotFoundException('User not found')
            }
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            const updateUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })

            if (!updateUser) {
                throw new NotFoundException('User not found')
            }
            return updateUser
        } catch (error) {
            console.log(error)
        }
    }

    async remove(id: string) {
        try {
            const removeUser = await this.userModel.findByIdAndDelete(id)

            if (!removeUser) {
                throw new NotFoundException('User not found')
            }
            return { _id: id }
        } catch (error) {
            console.log(error)
        }
    }

    async searchFunction(query: Record<string, any>) {
        try {
            const { name } = query;
            const data = await this.userModel.find(name);
            if (!data || data.length === 0) {
                throw new NotFoundException('No users found with the specified name');
            }
            return data;
        } catch (error) {
            console.error(error);
            throw new NotFoundException('Error while searching for users');
        }
    }
}