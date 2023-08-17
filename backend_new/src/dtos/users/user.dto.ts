import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { EnforceLowerCase } from '../../decorators/enforce-lower-case.decorator';
import { ValidationsGroupsEnum } from '../../enums/shared/validation-groups-enum';
import { AbstractDTO } from '../shared/abstract.dto';
import { LanguagesEnum } from '@prisma/client';
import { IdDTO } from '../shared/id.dto';
import { UserRole } from './user-role.dto';

export class User extends AbstractDTO {
  @Expose()
  @Type(() => Date)
  @IsDate({ groups: [ValidationsGroupsEnum.default] })
  @ApiProperty()
  passwordUpdatedAt: Date;

  @Expose()
  @IsNumber({}, { groups: [ValidationsGroupsEnum.default] })
  @ApiProperty()
  passwordValidForDays: number;

  @Expose()
  @IsDate({ groups: [ValidationsGroupsEnum.default] })
  @Type(() => Date)
  @ApiProperty({ required: false })
  confirmedAt?: Date;

  @Expose()
  @IsEmail({}, { groups: [ValidationsGroupsEnum.default] })
  @EnforceLowerCase()
  @ApiProperty()
  email: string;

  @Expose()
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @MaxLength(64, { groups: [ValidationsGroupsEnum.default] })
  firstName: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @MaxLength(64, { groups: [ValidationsGroupsEnum.default] })
  middleName?: string;

  @Expose()
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @MaxLength(64, { groups: [ValidationsGroupsEnum.default] })
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty({ required: false })
  @IsDate({ groups: [ValidationsGroupsEnum.default] })
  @Type(() => Date)
  dob?: Date;

  @Expose()
  @ApiProperty({ required: false })
  @IsPhoneNumber('US', { groups: [ValidationsGroupsEnum.default] })
  phoneNumber?: string;

  @Expose()
  @Type(() => IdDTO)
  @ApiProperty({ type: IdDTO, isArray: true, nullable: true })
  listings?: IdDTO[];

  @Expose()
  @Type(() => UserRole)
  @ApiProperty({ type: UserRole, required: false })
  userRoles?: UserRole;

  @Expose()
  @IsEnum(LanguagesEnum, { groups: [ValidationsGroupsEnum.default] })
  @ApiProperty({
    enum: LanguagesEnum,
    enumName: 'LanguagesEnum',
    required: false,
  })
  language?: LanguagesEnum;

  @Expose()
  @Type(() => IdDTO)
  @IsArray({ groups: [ValidationsGroupsEnum.default] })
  @ArrayMinSize(1, { groups: [ValidationsGroupsEnum.default] })
  @ValidateNested({ groups: [ValidationsGroupsEnum.default], each: true })
  @ApiProperty({ type: IdDTO, isArray: true })
  jurisdictions: IdDTO[];

  @Expose()
  @IsBoolean({ groups: [ValidationsGroupsEnum.default] })
  @ApiProperty({ required: false })
  mfaEnabled?: boolean;

  @Expose()
  @Type(() => Date)
  @ApiProperty({ required: false })
  lastLoginAt?: Date;

  @Expose()
  @Type(() => Number)
  @ApiProperty({ required: false })
  failedLoginAttemptsCount?: number;

  @Expose()
  @ApiProperty({ required: false })
  @IsBoolean({ groups: [ValidationsGroupsEnum.default] })
  phoneNumberVerified?: boolean;

  @Expose()
  @IsBoolean({ groups: [ValidationsGroupsEnum.default] })
  @ApiProperty()
  agreedToTermsOfService: boolean;

  @Expose()
  @IsDate({ groups: [ValidationsGroupsEnum.default] })
  @Type(() => Date)
  @ApiProperty({ required: false })
  hitConfirmationURL?: Date;

  // storing the active access token for a user
  @Expose()
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @ApiProperty({ required: false })
  activeAccessToken?: string;

  // storing the active refresh token for a user
  @Expose()
  @IsString({ groups: [ValidationsGroupsEnum.default] })
  @ApiProperty({ required: false })
  activeRefreshToken?: string;
}
