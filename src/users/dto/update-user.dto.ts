import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";

export class UpdateUserDto extends PartialType(OmitType(CreateUserDTO,["accountType","metadata"])) {}