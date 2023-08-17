import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { UserUpdate } from './user-update.dto';

import { EnforceLowerCase } from '../../decorators/enforce-lower-case.decorator';
import { ValidationsGroupsEnum } from '../../enums/shared/validation-groups-enum';
import { passwordRegex } from '../../utilities/password-regex';
import { Match } from '../../decorators/match-decorator';
import { IdDTO } from '../shared/id.dto';

export class UserCreate extends OmitType(UserUpdate, [
  'id',
  'userRoles',
  'password',
  'currentPassword',
  'email',
  'jurisdictions',
]) {
  @Expose()
  @ApiProperty({ required: true })
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @Matches(passwordRegex, {
    message: 'passwordTooWeak',
    groups: [ValidationsGroupsEnum.default],
  })
  password: string;

  @Expose()
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @MaxLength(64, { groups: [ValidationsGroupsEnum.default] })
  @Match('password', { groups: [ValidationsGroupsEnum.default] })
  @ApiProperty({ required: true })
  passwordConfirmation: string;

  @Expose()
  @ApiProperty({ required: true })
  @IsEmail({}, { groups: [ValidationsGroupsEnum.default] })
  @EnforceLowerCase()
  email: string;

  @Expose()
  @ApiProperty({ required: true })
  @IsEmail({}, { groups: [ValidationsGroupsEnum.default] })
  @Match('email', { groups: [ValidationsGroupsEnum.default] })
  @EnforceLowerCase()
  emailConfirmation: string;

  @Expose()
  @Type(() => IdDTO)
  @IsArray({ groups: [ValidationsGroupsEnum.default] })
  @ValidateNested({ groups: [ValidationsGroupsEnum.default], each: true })
  @ApiProperty({ type: IdDTO, isArray: true, required: false })
  jurisdictions?: IdDTO[];
}
