import { ApiHideProperty, OmitType } from "@nestjs/swagger"
import { ListingEvent } from "../entity/listing-event.entity"
import { Exclude, Expose } from "class-transformer"
import { IsOptional, IsUUID } from "class-validator"

export class ListingEventDto extends OmitType(ListingEvent, ["listing"] as const) {
  @Exclude()
  @ApiHideProperty()
  listing
}

export class ListingEventCreateDto extends OmitType(ListingEventDto, [
  "id",
  "createdAt",
  "updatedAt",
] as const) {}

export class ListingEventUpdateDto extends OmitType(ListingEventDto, [
  "id",
  "createdAt",
  "updatedAt",
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
}
