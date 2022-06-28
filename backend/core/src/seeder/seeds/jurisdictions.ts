import { INestApplicationContext } from "@nestjs/common"
import { JurisdictionCreateDto } from "../../jurisdictions/dto/jurisdiction-create.dto"
import { JurisdictionUpdateDto } from "../../jurisdictions/dto/jurisdiction-update.dto"
import { Language } from "../../shared/types/language-enum"
import { JurisdictionsService } from "../../jurisdictions/services/jurisdictions.service"

export const defaultJurisdictions: (JurisdictionCreateDto & JurisdictionUpdateDto)[] = [
  {
    name: "Alameda",
    preferences: [],
    languages: [Language.en],
    programs: [],
    publicUrl: "",
    emailFromAddress: "Alameda: Housing Bay Area",
    rentalAssistanceDefault:
      "Housing Choice Vouchers, Section 8 and other valid rental assistance programs will be considered for this property. In the case of a valid rental subsidy, the required minimum income will be based on the portion of the rent that the tenant pays after use of the subsidy.",
    enablePartnerSettings: true,
    enableAccessibilityFeatures: false,
    enableUtilitiesIncluded: true,
  },
  {
    name: "San Jose",
    preferences: [],
    languages: [Language.en],
    programs: [],
    publicUrl: "",
    emailFromAddress: "SJ: HousingBayArea.org",
    rentalAssistanceDefault:
      "Housing Choice Vouchers, Section 8 and other valid rental assistance programs will be considered for this property. In the case of a valid rental subsidy, the required minimum income will be based on the portion of the rent that the tenant pays after use of the subsidy.",
    enablePartnerSettings: null,
    enableAccessibilityFeatures: false,
    enableUtilitiesIncluded: true,
  },
  {
    name: "San Mateo",
    preferences: [],
    languages: [Language.en],
    programs: [],
    publicUrl: "",
    emailFromAddress: "SMC: HousingBayArea.org",
    rentalAssistanceDefault:
      "Housing Choice Vouchers, Section 8 and other valid rental assistance programs will be considered for this property. In the case of a valid rental subsidy, the required minimum income will be based on the portion of the rent that the tenant pays after use of the subsidy.",
    enablePartnerSettings: true,
    enableAccessibilityFeatures: false,
    enableUtilitiesIncluded: true,
  },
  {
    name: "Detroit",
    preferences: [],
    languages: [Language.en],
    programs: [],
    publicUrl: "",
    emailFromAddress: "Detroit Housing",
    rentalAssistanceDefault:
      "Housing Choice Vouchers, Section 8 and other valid rental assistance programs will be considered for this property. In the case of a valid rental subsidy, the required minimum income will be based on the portion of the rent that the tenant pays after use of the subsidy.",
    enablePartnerSettings: false,
    enableAccessibilityFeatures: false,
    enableUtilitiesIncluded: false,
  },
]

export async function createJurisdictions(app: INestApplicationContext) {
  const jurisdictionService = await app.resolve<JurisdictionsService>(JurisdictionsService)
  // some jurisdictions are added via previous migrations
  const initialJurisdictions = await jurisdictionService.list()
  // console.log("JKNFJNDKNJNDJDN")
  const toUpdate = []
  const toInsert = []

  defaultJurisdictions.forEach((defaultJuris) => {
    const location = initialJurisdictions.findIndex((item) => item.name === defaultJuris.name)
    if (location === -1) {
      toInsert.push(defaultJuris)
    } else {
      const jurisdictionKeys = Object.keys(defaultJuris)
      let keyIdx = 0
      let updateNeeded = false
      while (!updateNeeded && keyIdx < jurisdictionKeys.length) {
        const currentKey = jurisdictionKeys[keyIdx]
        if (defaultJuris[currentKey] !== initialJurisdictions[location][currentKey]) {
          toUpdate.push(initialJurisdictions[location])
          updateNeeded = true
        } else {
          keyIdx++
        }
      }
    }
  })

  await Promise.all(
    toUpdate.map(async (jurisdiction) => {
      const jurisdictionUpdated = { ...jurisdiction, enableUtilitiesIncluded: true }
      return await jurisdictionService.update(jurisdictionUpdated)
    })
  )
  const updatedJurisdictions = await jurisdictionService.list()

  const inserted = await Promise.all(
    toInsert.map(async (jurisdiction) => {
      return await jurisdictionService.create(jurisdiction)
    })
  )
  // names are unique
  return updatedJurisdictions.concat(inserted).sort((a, b) => (a.name < b.name ? -1 : 1))
}
