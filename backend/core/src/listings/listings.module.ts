import { CacheModule, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import * as redisStore from "cache-manager-redis-store"
import { ListingsService } from "./listings.service"
import { ListingsController } from "./listings.controller"
import { Listing } from "./entities/listing.entity"
import { Unit } from "../units/entities/unit.entity"
import { Preference } from "../preferences/entities/preference.entity"
import { AuthModule } from "../auth/auth.module"
import { User } from "../auth/entities/user.entity"
import { Property } from "../property/entities/property.entity"

@Module({
  imports: [
    CacheModule.register({
      ttl: 24 * 60 * 60,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    TypeOrmModule.forFeature([Listing, Preference, Unit, User, Property]),
    AuthModule,
  ],
  providers: [ListingsService],
  exports: [ListingsService],
  controllers: [ListingsController],
})
export class ListingsModule {}
