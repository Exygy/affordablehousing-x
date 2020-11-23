import { OmitType } from "@nestjs/swagger"
import { Applicant } from "../entities/applicant.entity"
import { Expose, Type } from "class-transformer"
import { IsDefined, IsOptional, IsUUID, ValidateNested } from "class-validator"
import { AddressDto, AddressUpdateDto } from "../../shared/dto/address.dto"

export class ApplicantDto extends OmitType(Applicant, ["address", "workAddress"] as const) {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDto)
  workAddress: AddressDto
}

export class ApplicantUpdateDto extends OmitType(Applicant, [
  "id",
  "createdAt",
  "updatedAt",
  "address",
  "workAddress",
] as const) {
  @Expose()
  @IsOptional()
  @IsUUID()
  id?: string

  @Expose()
  @IsOptional()
  @IsUUID()
  createdAt?: Date

  @Expose()
  @IsOptional()
  @IsUUID()
  updatedAt?: Date

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressUpdateDto)
  address: AddressUpdateDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressUpdateDto)
  workAddress: AddressUpdateDto
}
