import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Address{
    @Prop({required:true})
    address1:string;

    @Prop()
    address2?:string;

    @Prop()
    city?:string;

    @Prop({required:true})
    country:string;

    @Prop()
    state?:string;

    @Prop()
    zipCode?:string;
}

const schema = SchemaFactory.createForClass(Address)

export const AddressSchema = schema