import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger"
import { IsBoolean, IsDefined, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator"
import { Application } from "../entities/application.entity"
import { Exclude, Expose, Transform, Type } from "class-transformer"
import { IdDto } from "../../lib/id.dto"
import { PaginationFactory, PaginationQueryParams } from "../../utils/pagination.dto"
import { ListingDto } from "../../listings/listing.dto"
import { ApplicationDataCreateDto } from "./application-data.dto"

export class ApplicationsListQueryParams extends PaginationQueryParams {
  @Expose()
  @ApiProperty({
    type: String,
    example: "listingId",
    required: false,
  })
  @IsOptional()
  @IsString()
  listingId?: string

  @Expose()
  @ApiProperty({
    type: String,
    example: "search",
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string
}

export class ApplicationsCsvListQueryParams {
  @Expose()
  @ApiProperty({
    type: String,
    example: "listingId",
    required: false,
  })
  @IsOptional()
  @IsString()
  listingId?: string

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform((value: string | undefined) => value === "true", { toClassOnly: true })
  includeHeaders?: boolean
}

export class ApplicationDto extends OmitType(Application, ["listing", "user"] as const) {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ListingDto)
  listing: ListingDto

  @Exclude()
  @ApiHideProperty()
  user
}

export class PaginatedApplicationDto extends PaginationFactory<ApplicationDto>(ApplicationDto) {}

export class ApplicationCreateDto extends OmitType(ApplicationDto, [
  "id",
  "createdAt",
  "updatedAt",
  "listing",
  "application",
] as const) {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => IdDto)
  listing: IdDto

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => ApplicationDataCreateDto)
  application: ApplicationDataCreateDto
}

export class ApplicationUpdateDto extends ApplicationCreateDto {
  @Expose()
  @IsString()
  @IsUUID()
  id: string
}
