import { Field, InputType } from "@nestjs/graphql";
import { Service } from "./service.enum";
import { IsEnum, IsEmail, IsString, IsMobilePhone, IsPostalCode } from "class-validator";

@InputType()
export class LeadInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @IsMobilePhone()
  @Field(() => String)
  mobile: string;

  @IsString()
  @IsPostalCode()
  @Field(() => String)
  postcode: string;

  @IsEnum(Service, { each: true })
  @Field(() => [Service])
  services: Service[];
}