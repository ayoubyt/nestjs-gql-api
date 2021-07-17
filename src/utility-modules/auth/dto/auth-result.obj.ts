import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/entity-modules/users/entities/user.entity";

@ObjectType()
export class AuthResult
{
    @Field()
    user: User;
    @Field()
    accessToken : string;
}
