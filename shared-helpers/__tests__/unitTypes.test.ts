import { cleanup } from "@testing-library/react"
import { getUniqueUnitTypes, sortUnitTypes } from "../src/utilities/unitTypes"
import { UnitTypeEnum } from "../src/types/backend-swagger"

afterEach(cleanup)

describe("unit type: sortUnitTypes helper", () => {
  it("should return empty array if empty array is passed in", () => {
    expect(sortUnitTypes([])).toStrictEqual([])
  })
  it("should sort basic arrays", () => {
    expect(
      sortUnitTypes([
        { id: "SRO", name: "sro" },
        { id: "studio", name: "studio" },
        { id: "oneBdrm", name: "oneBdrm" },
        { id: "twoBdrm", name: "twoBdrm" },
        { id: "threeBdrm", name: "threeBdrm" },
        { id: "fourBdrm", name: "fourBdrm" },
      ])
    ).toStrictEqual([
      { id: "SRO", name: "sro" },
      { id: "studio", name: "studio" },
      { id: "oneBdrm", name: "oneBdrm" },
      { id: "twoBdrm", name: "twoBdrm" },
      { id: "threeBdrm", name: "threeBdrm" },
      { id: "fourBdrm", name: "fourBdrm" },
    ])
    expect(
      sortUnitTypes([
        { id: "fourBdrm", name: "fourBdrm" },
        { id: "studio", name: "studio" },
        { id: "oneBdrm", name: "oneBdrm" },
        { id: "twoBdrm", name: "twoBdrm" },
        { id: "threeBdrm", name: "threeBdrm" },
        { id: "SRO", name: "sro" },
      ])
    ).toStrictEqual([
      { id: "SRO", name: "sro" },
      { id: "studio", name: "studio" },
      { id: "oneBdrm", name: "oneBdrm" },
      { id: "twoBdrm", name: "twoBdrm" },
      { id: "threeBdrm", name: "threeBdrm" },
      { id: "fourBdrm", name: "fourBdrm" },
    ])
  })
  it("should sort complex arrays", () => {
    expect(
      sortUnitTypes([
        { id: "oneBdrm", name: "oneBdrm" },
        { id: "studio", name: "studio" },
        { id: "threeBdrm", name: "threeBdrm" },
        { id: "oneBdrm", name: "oneBdrm" },
        { id: "twoBdrm", name: "twoBdrm" },
        { id: "fourBdrm", name: "fourBdrm" },
        { id: "SRO", name: "sro" },
        { id: "threeBdrm", name: "threeBdrm" },
        { id: "fourBdrm", name: "fourBdrm" },
      ])
    ).toStrictEqual([
      { id: "SRO", name: "sro" },
      { id: "studio", name: "studio" },
      { id: "oneBdrm", name: "oneBdrm" },
      { id: "oneBdrm", name: "oneBdrm" },
      { id: "twoBdrm", name: "twoBdrm" },
      { id: "threeBdrm", name: "threeBdrm" },
      { id: "threeBdrm", name: "threeBdrm" },
      { id: "fourBdrm", name: "fourBdrm" },
      { id: "fourBdrm", name: "fourBdrm" },
    ])
  })
})

describe("unit type: getUniqueUnitTypes helper", () => {
  it("should return empty array if empty array is passed in", () => {
    expect(getUniqueUnitTypes([])).toStrictEqual([])
  })
  it("should return empty array if all elements are invalid", () => {
    expect(
      getUniqueUnitTypes([{ id: "", createdAt: new Date(), updatedAt: new Date() }])
    ).toStrictEqual([])
  })
  it("should return 1 element if 1 valid element is passed in", () => {
    expect(
      getUniqueUnitTypes([
        {
          id: "example id",
          createdAt: new Date(),
          updatedAt: new Date(),
          unitTypes: {
            id: "Test",
            createdAt: new Date(),
            updatedAt: new Date(),
            numBedrooms: 2,
            name: UnitTypeEnum.oneBdrm,
          },
        },
      ])
    ).toStrictEqual([
      {
        id: "Test",
        name: UnitTypeEnum.oneBdrm,
      },
    ])
  })
})
