import { Views } from "./types"

export const views: Views = {
  base: {
    select: [
      "listings.id",
      "listings.name",
      "listings.applicationDueDate",
      "listings.applicationDueTime",
      "listings.applicationOpenDate",
      "listings.status",
      "listings.waitlistMaxSize",
      "listings.waitlistCurrentSize",
      "image.id",
      "image.fileId",
      "image.label",
      "reservedCommunityType.id",
      "reservedCommunityType.name",
      "property.id",
      "buildingAddress.city",
      "buildingAddress.state",
      "buildingAddress.street",
      "buildingAddress.zipCode",
      "units.id",
      "units.floor",
      "units.minOccupancy",
      "units.maxOccupancy",
      "units.monthlyIncomeMin",
      "units.monthlyRent",
      "units.monthlyRentAsPercentOfIncome",
      "units.sqFeet",
      "units.status",
      "unitType.id",
      "unitType.name",
    ],
    leftJoins: [
      { join: "listings.image", alias: "image" },
      { join: "listings.property", alias: "property" },
      { join: "property.buildingAddress", alias: "buildingAddress" },
      { join: "property.units", alias: "units" },
      { join: "units.unitType", alias: "unitType" },
      { join: "listings.reservedCommunityType", alias: "reservedCommunityType" },
    ],
  },
}
