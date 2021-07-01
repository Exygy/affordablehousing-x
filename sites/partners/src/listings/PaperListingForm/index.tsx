import React, { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import {
  AuthContext,
  t,
  Form,
  AlertBox,
  setSiteAlertMessage,
  LoadingOverlay,
  StatusBar,
  AppearanceStyleType,
  Button,
} from "@bloom-housing/ui-components"
import { useForm, FormProvider } from "react-hook-form"
import {
  ListingStatus,
  CSVFormattingType,
  CountyCode,
  Unit,
  Listing,
} from "@bloom-housing/backend-core/types"

import Aside from "../Aside"
import FormListingData from "./sections/FormListingData"
import AdditionalDetails from "./sections/AdditionalDetails"
import AdditionalEligibility from "./sections/AdditionalEligibility"
import LeasingAgent from "./sections/LeasingAgent"
import AdditionalFees from "./sections/AdditionalFees"
import Units from "./sections/Units"
import { stringToBoolean, stringToNumber } from "../../../lib/helpers"
import { useAmiChartList } from "../../../lib/hooks"
import BuildingDetails from "./sections/BuildingDetails"
import ListingIntro from "./sections/ListingIntro"
import BuildingFeatures from "./sections/BuildingFeatures"

type FormListing = Listing

type ListingFormProps = {
  listing?: FormListing
  editMode?: boolean
}

type AlertErrorType = "api" | "form"

const defaultAddress = {
  id: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  city: "",
  state: "",
  street: "",
  zipCode: "",
}

const defaults: FormListing = {
  id: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  applicationAddress: defaultAddress,
  applicationDueDate: new Date(),
  applicationFee: "0",
  applicationMethods: [],
  applicationOpenDate: new Date(),
  applicationOrganization: "",
  applicationPickUpAddress: defaultAddress,
  applicationPickUpAddressOfficeHours: "",
  assets: [],
  buildingSelectionCriteria: "",
  countyCode: CountyCode.Alameda,
  costsNotIncluded: "",
  creditHistory: "",
  criminalBackground: "",
  CSVFormattingType: CSVFormattingType.basic,
  depositMax: "",
  depositMin: "",
  disableUnitsAccordion: false,
  displayWaitlistSize: false,
  events: [],
  leasingAgentAddress: defaultAddress,
  leasingAgentEmail: "test@email.com",
  leasingAgentName: "",
  leasingAgentOfficeHours: "",
  leasingAgentPhone: "",
  leasingAgentTitle: "",
  name: "",
  postmarkedApplicationsReceivedByDate: new Date(),
  preferences: [],
  programRules: "",
  rentalAssistance: "",
  rentalHistory: "",
  requiredDocuments: "",
  status: ListingStatus.pending,
  waitlistCurrentSize: 0,
  waitlistMaxSize: 0,
  whatToExpect: [],
  units: [],
  accessibility: "",
  amenities: "",
  buildingAddress: defaultAddress,
  buildingTotalUnits: 0,
  developer: "",
  householdSizeMax: 0,
  householdSizeMin: 0,
  neighborhood: "",
  petPolicy: "",
  smokingPolicy: "",
  unitsAvailable: 0,
  unitAmenities: "",
  servicesOffered: "",
  yearBuilt: 2021,
  urlSlug: undefined,
  showWaitlist: false,
  unitsSummarized: {
    unitTypes: [],
    reservedTypes: [],
    priorityTypes: [],
    amiPercentages: [],
    byUnitTypeAndRent: [],
    byUnitType: [],
    byNonReservedUnitType: [],
    byReservedType: [],
    byAMI: [],
    hmi: {
      columns: [],
      rows: [],
    },
  },
}

export type TempUnit = Unit & {
  tempId?: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListingForm = ({ listing, editMode }: ListingFormProps) => {
  const defaultValues = editMode ? listing : defaults
  const formMethods = useForm<FormListing>({
    defaultValues,
  })

  const router = useRouter()

  const { listingsService } = useContext(AuthContext)

  /**
   * fetch options
   */
  const { data: amiCharts = [] } = useAmiChartList()
  const [alert, setAlert] = useState<AlertErrorType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [units, setUnits] = useState<TempUnit[]>([])

  useEffect(() => {
    if (listing?.units) {
      const tempUnits = listing.units.map((unit, i) => ({
        ...unit,
        tempId: i + 1,
      }))
      setUnits(tempUnits)
    }
  }, [listing, setUnits])

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { handleSubmit, clearErrors, reset, trigger, getValues } = formMethods

  const triggerSubmit = async (data: FormListing) => onSubmit(data, "details")

  const setStatusAndSubmit = async (status: ListingStatus) => {
    const validation = await trigger()

    if (validation) {
      let data = getValues()
      data = {
        ...defaultValues,
        ...data,
        status,
      }

      if (data) {
        void onSubmit(data, editMode ? "details" : "new")
      }
    }
  }

  /*
    @data: form data comes from the react-hook-form
    @redirect: open listing details or reset form
  */
  const onSubmit = async (data: FormListing, redirect: "details" | "new") => {
    setAlert(null)
    setLoading(true)
    try {
      // data cleanup and formatting
      data.disableUnitsAccordion = stringToBoolean(data.disableUnitsAccordion)
      units.forEach((unit) => {
        switch (unit.unitType) {
          case "threeBdrm":
            unit.numBedrooms = 3
            break
          case "twoBdrm":
            unit.numBedrooms = 2
            break
          case "oneBdrm":
            unit.numBedrooms = 1
            break
          default:
            unit.numBedrooms = null
        }

        unit.floor = stringToNumber(unit.floor)
        unit.maxOccupancy = stringToNumber(unit.maxOccupancy)
        unit.minOccupancy = stringToNumber(unit.minOccupancy)
        unit.numBathrooms = stringToNumber(unit.numBathrooms)

        if (unit.sqFeet.length === 0) {
          delete unit.sqFeet
        }

        if (unit.amiChart?.length) {
          const chart = amiCharts.find((chart) => chart.id === unit.amiChart)
          unit.amiChart = chart
        } else {
          delete unit.amiChart
        }

        if (unit.id === undefined) {
          unit.id = ""
          delete unit.updatedAt
          delete unit.createdAt
        }

        delete unit.tempId
      })
      data.units = units
      const typedData: FormListing = {
        ...data,
        yearBuilt: data.yearBuilt ? Number(data.yearBuilt) : null,
      }
      const result = editMode
        ? await listingsService.update({
            listingId: listing.id,
            body: { id: listing.id, ...typedData },
          })
        : await listingsService.create({ body: typedData })
      setLoading(false)

      if (result) {
        setSiteAlertMessage(
          editMode ? t("listings.listingUpdated") : t("listings.listingSubmitted"),
          "success"
        )

        if (redirect === "details") {
          void router.push(`/listings/${result.id}`)
        } else {
          reset()
          clearErrors()
          setAlert(null)
          void router.push("/")
        }
      }
    } catch (err) {
      setLoading(false)
      setAlert("api")
    }
  }

  const onError = () => {
    setAlert("form")
  }

  return (
    <LoadingOverlay isLoading={loading}>
      <>
        <StatusBar
          backButton={
            <Button
              inlineIcon="left"
              icon="arrowBack"
              onClick={() => (editMode ? router.push(`/listing/${listing?.id}`) : router.back())}
            >
              {t("t.back")}
            </Button>
          }
          tagStyle={
            listing?.status == ListingStatus.active
              ? AppearanceStyleType.success
              : AppearanceStyleType.primary
          }
          tagLabel={
            listing?.status
              ? t(`listings.listingStatus.${listing.status}`)
              : t(`listings.listingStatus.pending`)
          }
        />

        <FormProvider {...formMethods}>
          <section className="bg-primary-lighter py-5">
            <div className="max-w-screen-xl px-5 mx-auto">
              {alert && (
                <AlertBox className="mb-5" onClose={() => setAlert(null)} closeable type="alert">
                  {alert === "form"
                    ? t("listing.add.listingAddError")
                    : t("errors.alert.badRequest")}
                </AlertBox>
              )}

              <Form id="listing-form" onSubmit={handleSubmit(triggerSubmit, onError)}>
                <div className="flex flex-row flex-wrap">
                  <div className="info-card md:w-9/12">
                    <ListingIntro />
                    <FormListingData />
                    <BuildingDetails />
                    <Units
                      units={units}
                      setUnits={setUnits}
                      amiCharts={amiCharts}
                      disableUnitsAccordion={listing?.disableUnitsAccordion}
                    />
                    <AdditionalFees />
                    <BuildingFeatures />
                    <AdditionalEligibility />
                    <AdditionalDetails />
                    <LeasingAgent />
                  </div>

                  <aside className="md:w-3/12 md:pl-6">
                    <Aside
                      type={editMode ? "edit" : "add"}
                      setStatusAndSubmit={setStatusAndSubmit}
                    />
                  </aside>
                </div>
              </Form>
            </div>
          </section>
        </FormProvider>
      </>
    </LoadingOverlay>
  )
}

export default ListingForm
