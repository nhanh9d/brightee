import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { Service } from "./service.enum";

@Entity()
@ObjectType()
export class Lead {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  //set unique
  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  mobile: string;

  @Column()
  @Field(() => String)
  postcode: string;

  @Column({ type: 'jsonb' })
  @Field(() => [Service])
  services: string[];

  @Column()
  @Field(() => Date)
  createdAt: Date;
}