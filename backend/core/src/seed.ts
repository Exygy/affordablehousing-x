import dotenv from "dotenv"
import "reflect-metadata"
import { createConnection } from "typeorm"
import { Listing } from "./entity/Listing"
import { Listing as OldListing } from "@bloom-housing/core"
import listingsLoader from "./lib/listings_loader"
import { Unit } from "./entity/Unit"
import { Attachment } from "./entity/Attachment"
import { Preference } from "./entity/Preference"
import config from "../ormconfig"

const skipped = ["id", "units", "attachments", "preferences"]
const types = { units: Unit, attachments: Attachment, preferences: Preference }

createConnection(config)
  // eslint-disable-next-line @typescript-eslint/require-await
  .then(async (connection) => {
    dotenv.config({ path: ".env" })
    const listings = (await listingsLoader("listings")) as OldListing[]

    for await (const listing of listings) {
      const l = new Listing()
      const entities = {}
      for await (const key of Object.keys(listing)) {
        if (!skipped.includes(key)) {
          l[key] = listing[key]
        } else if (key !== "id") {
          entities[key] = listing[key]
        }
      }
      await connection.manager.save(l)

      for await (const key of Object.keys(entities)) {
        for await (let value of entities[key]) {
          if (value) {
            if (value instanceof Array) {
              value = (value as any).map((obj) => {
                delete obj["id"]
                obj["listing"] = l.id
                return obj
              })
            } else {
              delete value["id"]
              value["listing"] = l.id
            }

            await connection.createQueryBuilder().insert().into(types[key]).values(value).execute()
          }
        }
      }
    }
  })
  .catch((error) => console.log("TypeORM connection error: ", error))
