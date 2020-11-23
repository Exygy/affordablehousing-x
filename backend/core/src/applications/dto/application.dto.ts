import { ApiHideProperty, OmitType } from "@nestjs/swagger"
import { IsDefined, IsOptional, IsUUID, ValidateNested } from "class-validator"
import { Application } from "../entities/application.entity"
import { Exclude, Expose, Type } from "class-transformer"
import { IdDto } from "../../lib/id.dto"
import { PaginationFactory } from "../../utils/pagination.dto"
import { ListingDto } from "../../listings/listing.dto"
import { ApplicantDto, ApplicantUpdateDto } from "./applicant.dto"
import { AddressDto, AddressUpdateDto } from "../../shared/dto/address.dto"
import { AlternateContactDto, AlternateContactUpdateDto } from "./alternate-contact.dto"
import { AccessbilityDto, AccessbilityUpdateDto } from "./accessibility.dto"
import { DemographicsDto, DemographicsUpdateDto } from "./demographics.dto"
import { HouseholdMemberDto, HouseholdMemberUpdateDto } from "./household-member.dto"
import {
  ApplicationPreferencesDto,
  ApplicationPreferencesUpdateDto,
} from "./application-preferences.dto"

export class ApplicationDto extends OmitType(Application, [
  "listing",
  "user",
  "applicant",
  "mailingAddress",
  "alternateAddress",
  "alternateContact",
  "accessibility",
  "demographics",
  "householdMembers",
  "preferences",
] as const) {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ListingDto)
  listing: ListingDto

  @Exclude()
  @ApiHideProperty()
  user

  @Expose()
  @ValidateNested()
  @Type(() => ApplicantDto)
  applicant: ApplicantDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDto)
  mailingAddress: AddressDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDto)
  alternateAddress: AddressDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AlternateContactDto)
  alternateContact: AlternateContactDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AccessbilityDto)
  accessibility: AccessbilityDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DemographicsDto)
  demographics: DemographicsDto

  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => HouseholdMemberDto)
  householdMembers: HouseholdMemberDto[]

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ApplicationPreferencesDto)
  preferences: ApplicationPreferencesDto
}

export class PaginatedApplicationDto extends PaginationFactory<ApplicationDto>(ApplicationDto) {}

export class ApplicationUpdateDto extends OmitType(ApplicationDto, [
  "id",
  "createdAt",
  "updatedAt",
  "listing",
  "applicant",
  "mailingAddress",
  "alternateAddress",
  "alternateContact",
  "accessibility",
  "demographics",
  "householdMembers",
  "preferences",
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
  @Type(() => IdDto)
  listing: IdDto

  @Expose()
  @ValidateNested()
  @Type(() => ApplicantUpdateDto)
  applicant: ApplicantUpdateDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressUpdateDto)
  mailingAddress: AddressUpdateDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AddressUpdateDto)
  alternateAddress: AddressUpdateDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AlternateContactUpdateDto)
  alternateContact: AlternateContactUpdateDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => AccessbilityUpdateDto)
  accessibility: AccessbilityUpdateDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DemographicsUpdateDto)
  demographics: DemographicsUpdateDto

  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => HouseholdMemberUpdateDto)
  householdMembers: HouseholdMemberUpdateDto[]

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ApplicationPreferencesUpdateDto)
  preferences: ApplicationPreferencesUpdateDto
}
