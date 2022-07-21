import { ListingSeedType, UnitSeedType } from "./listings"
import {
  getDate,
  getDefaultAssets,
  getHopwaPreference,
  getLiveWorkPreference,
  getDisplaceePreference,
  getPbvPreference,
  getServedInMilitaryProgram,
  getTayProgram,
  PriorityTypes,
} from "./shared"
import { BaseEntity, DeepPartial } from "typeorm"
import { ListingDefaultSeed } from "./listing-default-seed"
import { CountyCode } from "../../../shared/types/county-code"
import { ListingReviewOrder } from "../../../listings/types/listing-review-order-enum"
import { ListingStatus } from "../../../listings/types/listing-status-enum"
import { UnitCreateDto } from "../../../units/dto/unit-create.dto"
import { Listing } from "../../../listings/entities/listing.entity"
import { ListingAvailability } from "../../../listings/types/listing-availability-enum"

const coliseumListing: ListingSeedType = {
  jurisdictionName: "Alameda",
  digitalApplication: false,
  commonDigitalApplication: false,
  paperApplication: false,
  referralOpportunity: false,
  countyCode: CountyCode.alameda,
  applicationDropOffAddress: null,
  applicationDropOffAddressOfficeHours: null,
  applicationMailingAddress: null,
  applicationDueDate: new Date(getDate(1).setHours(17, 0, 0, 0)),
  applicationFee: "12",
  applicationOpenDate: getDate(-10),
  applicationOrganization: "John Stewart Company",
  applicationPickUpAddress: {
    county: "Alameda",
    city: "Oakland",
    street: "1701 Martin Luther King Way",
    zipCode: "94621",
    state: "CA",
    latitude: 37.7549632,
    longitude: -122.1968792,
  },
  accessibility:
    "Fifteen (15) units are designed for residents with mobility impairments per HUD/U.F.A.S. guidelines with one (1) of these units further designed for residents with auditory or visual impairments.  There are two (2) additional units with features for those with auditory or visual impairments.  All the other units are adaptable. Accessible features in the property include: * 36” wide entries and doorways * Kitchens built to the accessibility standards of the California Building Code, including appliance controls and switch outlets within reach, and work surfaces and storage at accessible heights * Bathrooms built to the accessibility standards of the California Building Code, including grab bars, flexible shower spray hose, switch outlets within reach, and in-tub seats. * Closet rods and shelves at mobility height. * Window blinds/shades able to be used without grasping or twisting * Units for the Hearing & Visually Impaired will have a horn & strobe for fire alarm and a flashing light doorbell. The 44 non-ADA units are built to Adaptable standards.",
  amenities: "Community room, bike parking, courtyard off the community room, 2nd floor courtyard.",
  buildingAddress: {
    county: "Alameda",
    city: "Oakland",
    street: "3300 Hawley Street",
    zipCode: "94621",
    state: "CA",
    latitude: 37.7549632,
    longitude: -122.1968792,
  },
  buildingTotalUnits: 58,
  developer: "Resources for Community Development",
  neighborhood: "Coliseum",
  petPolicy: "Permitted",
  servicesOffered:
    "Residential supportive services are provided to all residents on a volunteer basis.",
  smokingPolicy: "No Smoking",
  unitAmenities: null,
  yearBuilt: 2021,
  images: [],
  applicationPickUpAddressOfficeHours: null,
  buildingSelectionCriteria: null,
  costsNotIncluded:
    "Electricity, phone, TV, internet, and cable not included. For the PBV units, deposit is one month of the tenant-paid portion of rent (30% of income).",
  creditHistory:
    "Management staff will request credit histories on each adult member of each applicant household. It is the applicant’s responsibility that at least one household member can demonstrate utilities can be put in their name. For this to be demonstrated, at least one household member must have a credit report that shows no utility accounts in default. Applicants who cannot have utilities put in their name will be considered ineligible. Any currently open bankruptcy proceeding of any of the household members will be considered a disqualifying condition. Applicants will not be considered to have a poor credit history when they were delinquent in rent because they were withholding rent due to substandard housing conditions in a manner consistent with local ordinance; or had a poor rent paying history clearly related to an excessive rent relative to their income, and responsible efforts were made to resolve the non-payment problem. If there is a finding of any kind which would negatively impact an application, the applicant will be notified in writing. The applicant then shall have 14 calendar days in which such a finding may be appealed to staff for consideration.",
  criminalBackground: null,
  depositMax: "200",
  depositMin: "100",
  disableUnitsAccordion: true,
  displayWaitlistSize: false,
  leasingAgentAddress: {
    county: "Alameda",
    city: "Oakland",
    street: "1701 Martin Luther King Way",
    zipCode: "94621",
    state: "CA",
    latitude: 37.7549632,
    longitude: -122.1968792,
  },
  leasingAgentEmail: "coliseum@jsco.net",
  leasingAgentName: "Leasing agent name",
  leasingAgentOfficeHours:
    "Tuesdays & Thursdays, 9:00am to 5:00pm | Persons with disabilities who are unable to access the on-line application may request a Reasonable Accommodation by calling (510) 649-5739 for assistance. A TDD line is available at (415) 345-4470.",
  leasingAgentPhone: "(510) 625-1632",
  leasingAgentTitle: "Property Manager",
  listingMultiselectQuestions: [],
  name: "Test: Coliseum",
  postmarkedApplicationsReceivedByDate: null,
  programRules: null,
  rentalAssistance: "Rental assistance",
  rentalHistory: "Two years' landlord history or homeless verification",
  requiredDocuments:
    "Application Document Checklist: https://org-housingbayarea-public-assets.s3-us-west-1.amazonaws.com/Tax+Credit+Application+Interview+Checklist.pdf",
  reviewOrderType: "firstComeFirstServe" as ListingReviewOrder,
  specialNotes:
    "Priority Units: 3 apartments are set-aside for households eligible for the HOPWA program (Housing Opportunities for Persons with AIDS), which are households where a person has been medically diagnosed with HIV/AIDS. These 3 apartments also have Project-Based Section rental subsidies (tenant pays 30% of household income). 15 apartments are for those with mobility impairments and one of these units also has features for the hearing/visually impaired. Two additional apartments have features for the hearing/visually impaired. All units require eligibility requirements beyond income qualification: The waiting list will be ordered by incorporating the Alameda County preference for eligible households in which at least one member lives or works in the County. Three (3) apartments are restricted to households eligible under the HOPWA (Housing Opportunities for Persons with AIDS), which are households where a person has been medically diagnosed with HIV/AIDS. These apartments also receive PBV’s from OHA. For the twenty-five (25) apartments that have Project-Based Section 8 Vouchers from OHA, applicants will be called for an interview in the order according to the site-based waiting list compiled from the initial application and lotter process specifically for the PBV units.  The waiting list order for these apartments will also incorporate the local preferences required by OHA.  These preferences are: * A Residency preference (Applicants who live or work in the City of Oakland at the time of the application interview and/or applicants that lived or worked in the City of Oakland at the time of submitting their initial application and can verify their previous residency/employment at the applicant interview, qualify for this preference). * A Family preference (Applicant families with two or more persons, or a single person applicant that is 62 years of age or older, or a single person applicant with a disability, qualify for this preference). * A Veteran and active members of the military preference.  Per OHA policy, a Veteran is a person who served in the active military, naval, or air service and who was discharged or released from such service under conditions other than dishonorable. * A Homeless preference.  Applicant families who meet the McKinney-Vento Act definition of homeless qualify for this preference (see definition below). Each PBV applicant will receive one point for each preference for which it is eligible and the site-based PBV waiting list will be prioritized by the number of points applicants have from these preferences. Applicants for the PBV units must comply with OHA’s policy regarding Social Security Numbers.  The applicant and all members of the applicant’s household must disclose the complete and accurate social security number (SSN) assigned to each household member, and they must provide the documentation necessary to verify each SSN. As an EveryOne Home partner, each applicant’s individual circumstances will be evaluated, alternative forms of verification and additional information submitted by the applicant will considered, and reasonable accommodations will be provided when requested and if verified and necessary. Persons with disabilities are encouraged to apply.",
  status: ListingStatus.active,
  waitlistCurrentSize: 0,
  waitlistMaxSize: 3000,
  waitlistOpenSpots: 3000,
  isWaitlistOpen: true,
  whatToExpect: null,
  listingAvailability: ListingAvailability.availableUnits,
  utilities: {
    water: false,
    gas: false,
    trash: null,
    sewer: true,
    electricity: false,
    cable: null,
    phone: false,
    internet: null,
  },
}

export class ListingColiseumSeed extends ListingDefaultSeed {
  async seed() {
    const priorityTypeMobilityAndHearingWithVisual = await this.unitAccessibilityPriorityTypeRepository.findOneOrFail(
      {
        name: PriorityTypes.mobilityHearingVisual,
      }
    )
    const priorityTypeMobilityAndMobilityWithHearingAndVisual = await this.unitAccessibilityPriorityTypeRepository.findOneOrFail(
      {
        name: PriorityTypes.mobilityHearingVisual,
      }
    )
    const priorityTypeMobilityAndHearing = await this.unitAccessibilityPriorityTypeRepository.findOneOrFail(
      {
        name: PriorityTypes.mobilityHearing,
      }
    )
    const priorityMobility = await this.unitAccessibilityPriorityTypeRepository.findOneOrFail({
      name: PriorityTypes.mobility,
    })
    const unitTypeOneBdrm = await this.unitTypeRepository.findOneOrFail({ name: "oneBdrm" })
    const unitTypeTwoBdrm = await this.unitTypeRepository.findOneOrFail({ name: "twoBdrm" })
    const unitTypeThreeBdrm = await this.unitTypeRepository.findOneOrFail({ name: "threeBdrm" })

    const alamedaJurisdiction = await this.jurisdictionRepository.findOneOrFail({
      name: CountyCode.alameda,
    })
    const amiChart = await this.amiChartRepository.findOneOrFail({
      name: "AlamedaCountyTCAC2021",
      jurisdiction: alamedaJurisdiction,
    })

    const coliseumUnits: Array<UnitSeedType> = [
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "36990",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 3,
        minOccupancy: 1,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 1,
        number: null,
        sqFeet: "486",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "36990",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 3,
        minOccupancy: 1,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 1,
        number: null,
        sqFeet: "491",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "36990",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 3,
        minOccupancy: 1,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 1,
        number: null,
        sqFeet: "491",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "61650",
        annualIncomeMin: "38520",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 3,
        minOccupancy: 1,
        monthlyIncomeMin: "3210",
        monthlyRent: "1284",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 1,
        number: null,
        sqFeet: "491",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "30",
        annualIncomeMax: "44400",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 4,
        minOccupancy: 2,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "785",
      },
      {
        amiChart: amiChart,
        amiPercentage: "45",
        annualIncomeMax: "66600",
        annualIncomeMin: "41616",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3468",
        monthlyRent: "1387",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "45",
        annualIncomeMax: "66600",
        annualIncomeMin: "41616",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3468",
        monthlyRent: "1387",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "74000",
        annualIncomeMin: "46236",
        bmrProgramChart: false,
        floor: 1,
        maxOccupancy: 5,
        minOccupancy: 2,
        monthlyIncomeMin: "3853",
        monthlyRent: "1541",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 1,
        numBedrooms: 2,
        number: null,
        sqFeet: "748",
      },
      {
        amiChart: amiChart,
        amiPercentage: "20",
        annualIncomeMax: "31800",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "20",
        annualIncomeMax: "31800",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 6,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1080",
      },
      {
        amiChart: amiChart,
        amiPercentage: "20",
        annualIncomeMax: "31800",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "45",
        annualIncomeMax: "71550",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "45",
        annualIncomeMax: "71550",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "45",
        annualIncomeMax: "71550",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "79500",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "79500",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "79500",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "79500",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "79500",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "79500",
        annualIncomeMin: "0",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 6,
        minOccupancy: 4,
        monthlyIncomeMin: "0",
        monthlyRent: null,
        monthlyRentAsPercentOfIncome: "30",
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "84950",
        annualIncomeMin: "53436",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 7,
        minOccupancy: 4,
        monthlyIncomeMin: "4453",
        monthlyRent: "1781",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "84950",
        annualIncomeMin: "53436",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 7,
        minOccupancy: 4,
        monthlyIncomeMin: "4453",
        monthlyRent: "1781",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "84950",
        annualIncomeMin: "53436",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 7,
        minOccupancy: 4,
        monthlyIncomeMin: "4453",
        monthlyRent: "1781",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "84950",
        annualIncomeMin: "53436",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 7,
        minOccupancy: 4,
        monthlyIncomeMin: "4453",
        monthlyRent: "1781",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "84950",
        annualIncomeMin: "53436",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 7,
        minOccupancy: 4,
        monthlyIncomeMin: "4453",
        monthlyRent: "1781",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "84950",
        annualIncomeMin: "53436",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 7,
        minOccupancy: 4,
        monthlyIncomeMin: "4453",
        monthlyRent: "1781",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
      {
        amiChart: amiChart,
        amiPercentage: "50",
        annualIncomeMax: "84950",
        annualIncomeMin: "53436",
        bmrProgramChart: false,
        floor: 2,
        maxOccupancy: 7,
        minOccupancy: 4,
        monthlyIncomeMin: "4453",
        monthlyRent: "1781",
        monthlyRentAsPercentOfIncome: null,
        numBathrooms: 2,
        numBedrooms: 3,
        number: null,
        sqFeet: "1029",
      },
    ]

    const listingCreateDto: Omit<
      DeepPartial<Listing>,
      keyof BaseEntity | "urlSlug" | "showWaitlist"
    > = {
      ...coliseumListing,
      assets: getDefaultAssets(),
      listingMultiselectQuestions: [
        {
          multiselectQuestion: await this.multiselectQuestionsRepository.findOneOrFail({
            text: getLiveWorkPreference(alamedaJurisdiction.name).text,
          }),
          ordinal: 1,
        },
        {
          multiselectQuestion: await this.multiselectQuestionsRepository.findOneOrFail({
            text: getPbvPreference(alamedaJurisdiction.name).text,
          }),
          ordinal: 2,
        },
        {
          multiselectQuestion: await this.multiselectQuestionsRepository.findOneOrFail({
            text: getHopwaPreference(alamedaJurisdiction.name).text,
          }),
          ordinal: 3,
        },
        {
          multiselectQuestion: await this.multiselectQuestionsRepository.findOneOrFail({
            text: getDisplaceePreference(alamedaJurisdiction.name).text,
          }),
          ordinal: 4,
        },
        {
          multiselectQuestion: await this.multiselectQuestionsRepository.findOneOrFail({
            text: getServedInMilitaryProgram().text,
          }),
          ordinal: 1,
        },
        {
          multiselectQuestion: await this.multiselectQuestionsRepository.findOneOrFail({
            text: getTayProgram().text,
          }),
          ordinal: 2,
        },
      ],
      events: [],
    }

    const listing = await this.listingRepository.save(listingCreateDto)

    const unitsToBeCreated: Array<Omit<UnitCreateDto, keyof BaseEntity>> = coliseumUnits.map(
      (unit) => {
        return {
          ...unit,
          amiChart,
          listing: { id: listing.id },
        }
      }
    )

    // Assign priorityTypes
    for (let i = 0; i < 3; i++) {
      unitsToBeCreated[i].priorityType = priorityTypeMobilityAndMobilityWithHearingAndVisual
    }
    for (let i = 3; i < 14; i++) {
      unitsToBeCreated[i].priorityType = priorityTypeMobilityAndHearingWithVisual
    }
    for (let i = 14; i < 27; i++) {
      unitsToBeCreated[i].priorityType = priorityTypeMobilityAndHearing
    }
    for (let i = 27; i < 46; i++) {
      unitsToBeCreated[i].priorityType = priorityMobility
    }

    // Assign unit types
    for (let i = 0; i < 4; i++) {
      unitsToBeCreated[i].unitType = unitTypeOneBdrm
    }
    for (let i = 4; i < 27; i++) {
      unitsToBeCreated[i].unitType = unitTypeTwoBdrm
    }
    for (let i = 27; i < 46; i++) {
      unitsToBeCreated[i].unitType = unitTypeThreeBdrm
    }

    await this.unitsRepository.save(unitsToBeCreated)

    return listing
  }
}
