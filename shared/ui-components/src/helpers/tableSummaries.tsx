import * as React from "react"
import t from "./translator"
import { UnitSummary, UnitSummaryByReservedType } from "@bloom-housing/core/src/units"

export const unitSummariesTable = (summaries: UnitSummary[]) => {
  const unitSummaries = summaries.map(unitSummary => {
    const unitPluralization =
      unitSummary.totalAvailable == 1 ? t("listings.unit") : t("listings.units")
    return {
      unitType: <strong>{t("listings.unitTypes." + unitSummary.unitType)}</strong>,
      minimumIncome: (
        <>
          <strong>{unitSummary.minIncomeRange.min}</strong>/month
        </>
      ),
      rent: (
        <>
          <strong>{unitSummary.rentRange.min}</strong>/month
        </>
      ),
      availability: (
        <>
          {unitSummary.totalAvailable > 0 ? (
            <>
              <strong>{unitSummary.totalAvailable}</strong> {unitPluralization}
            </>
          ) : (
            <>{t("listings.waitlist")}</>
          )}
        </>
      )
    }
  })

  return unitSummaries
}

export const groupNonReservedAndReservedSummaries = (
  nonReservedSummaries: UnitSummary[],
  reservedTypeSummaries: UnitSummaryByReservedType[]
) => {
  let groupedUnits = []

  if (nonReservedSummaries.length > 0) {
    const unitSummaries = unitSummariesTable(nonReservedSummaries)
    groupedUnits = [
      {
        header: null,
        className: null,
        data: unitSummaries
      }
    ]
  }

  if (reservedTypeSummaries.length > 0) {
    reservedTypeSummaries.forEach((item: UnitSummaryByReservedType) => {
      groupedUnits.push({
        header: (
          <>
            <span style={{ color: "orange" }}>★</span>{" "}
            {t("listings.reservedFor", { type: item.reservedType + "s" })}
          </>
        ),
        className: "reserved",
        data: unitSummariesTable(item.byUnitType)
      })
    })
  }

  return groupedUnits
}
