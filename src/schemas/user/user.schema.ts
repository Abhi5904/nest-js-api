import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Address, AddressSchema } from '../common';
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { compare, hash } from 'bcrypt';
import { Document, Model } from 'mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from "src/constants";

@Schema({
    timestamps: true,
    collection: "users",
    discriminatorKey:"userType"
})
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop()
    age?: number;

    @Prop()
    phone?: string;

    @Prop({
        type: String,
        enum: Object.keys(ACCOUNT_STATUS),
        default: ACCOUNT_STATUS.ACTIVE
    })
    status?: ACCOUNT_STATUS;

    @Prop({
        type: String,
        enum: Object.keys(ACCOUNT_TYPE),
        immutable: true,
        required: true
    })
    accountType: ACCOUNT_TYPE;

    @Prop({ default: [] })
    social?: string[];

    @Prop({ default: false })
    isEmailVerified?: boolean;

    @Prop({ type: AddressSchema, required: true })
    address: Address;

    @Prop(raw({
        reference: { type: String },
        beta: { type: Boolean }
    }))
    metadata: Record<string, any> | any;

    isValidPassword: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

UserSchema.methods.isValidPassword = async function (this: UserDocument, candidatePassword: string): Promise<boolean> {
    const hashedPassword = this.password;
    const isMatched = await compare(candidatePassword, hashedPassword);
    return isMatched;
};

UserSchema.statics.findByEmailAndPassword = async function (email: string, password: string) {
    const user = await this.findOne<UserDocument>({ email }, "+password")

    if (!user) {
        throw new NotFoundException("User not found")
    }

    const ispwdMatched = await user.isValidPassword(password)

    if (!ispwdMatched) {
        throw new UnauthorizedException();
    }

    return user;
}
export interface IUserModel extends Model<UserDocument> {
    findByEmailAndPassword: (email: string, password: string) => Promise<UserDocument | undefined>
}

export type UserDocument = User & Document

export const USER_MODEL = User.name;