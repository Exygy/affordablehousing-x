import { ApiHideProperty, OmitType } from "@nestjs/swagger"
import { User } from "../entities/user.entity"
import { Exclude, Expose } from "class-transformer"
import { IsString, MaxLength } from "class-validator"
import { ValidationsGroupsEnum } from "../../shared/validations-groups.enum"

export class UserDto extends OmitType(User, ["passwordHash", "applications", "isAdmin"] as const) {
  @Exclude()
  @ApiHideProperty()
  passwordHash

  @Exclude()
  @ApiHideProperty()
  isAdmin
}

export class UserDtoWithAccessToken extends UserDto {
  @Expose()
  accessToken: string
}

export class UserCreateDto extends OmitType(UserDto, ["id", "createdAt", "updatedAt"] as const) {
  @Exclude()
  @ApiHideProperty()
  id

  @Exclude()
  @ApiHideProperty()
  createdAt

  @Exclude()
  @ApiHideProperty()
  updatedAt

  @Expose()
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @MaxLength(64)
  password: string
}

export class UserUpdateDto extends OmitType(UserDto, ["email"] as const) {
  @Exclude()
  @ApiHideProperty()
  email
}
