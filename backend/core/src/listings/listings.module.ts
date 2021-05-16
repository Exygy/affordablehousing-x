import { CacheModule, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ListingsService } from "./listings.service"
import { ListingsController } from "./listings.controller"
import { Listing } from "./entities/listing.entity"
import { Unit } from "../units/entities/unit.entity"
import { Preference } from "../preferences/entities/preference.entity"
import { AuthModule } from "../auth/auth.module"
import { User } from "../user/entities/user.entity"

@Module({
  imports: [
    CacheModule.register({
      ttl: 1, // we need different caching strategies per app (public vs partners)
      max: 1,
    }),
    TypeOrmModule.forFeature([Listing, Preference, Unit, User]),
    AuthModule,
  ],
  providers: [ListingsService],
  exports: [ListingsService],
  controllers: [ListingsController],
})
export class ListingsModule {}
