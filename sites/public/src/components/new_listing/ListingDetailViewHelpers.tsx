import React from "react"
import { UseFormMethods } from "react-hook-form"
import dayjs from "dayjs"
import { Button, Card, Dialog, Heading, Link } from "@bloom-housing/ui-seeds"
import {
  ApplicationAddressTypeEnum,
  ApplicationMethod,
  ApplicationMethodsTypeEnum,
  Jurisdiction,
  Listing,
  ListingEventCreate,
  ListingMultiselectQuestion,
  MultiselectQuestionsApplicationSectionEnum,
  ReviewOrderTypeEnum,
} from "@bloom-housing/shared-helpers/src/types/backend-swagger"
import { TagVariant } from "@bloom-housing/ui-seeds/src/text/Tag"
import {
  EventType,
  ExpandableText,
  FieldGroup,
  Form,
  StandardTable,
  StandardTableData,
  t,
  TableHeaders,
} from "@bloom-housing/ui-components"
import {
  cloudinaryPdfFromId,
  getOccupancyDescription,
  getTimeRangeString,
  occupancyTable,
} from "@bloom-housing/shared-helpers"
import { downloadExternalPDF } from "../../lib/helpers"

import styles from "./ListingDetailView.module.scss"
import { CardList, ContentCard } from "../../patterns/CardList"
import Markdown from "markdown-to-jsx"

export const getFilteredMultiselectQuestions = (
  multiselectQuestions: ListingMultiselectQuestion[],
  section: MultiselectQuestionsApplicationSectionEnum
) => {
  return multiselectQuestions.filter(
    (elem) =>
      elem.multiselectQuestions.applicationSection === section &&
      !elem.multiselectQuestions.hideFromListing
  )
}

export const getMultiselectQuestionData = (multiselectQuestions: ListingMultiselectQuestion[]) => {
  return multiselectQuestions.map((listingMultiselectQuestion, index) => {
    return {
      ordinal: index + 1,
      links: listingMultiselectQuestion?.multiselectQuestions?.links,
      title: listingMultiselectQuestion?.multiselectQuestions?.text,
      description: listingMultiselectQuestion?.multiselectQuestions?.description,
    }
  })
}

export const getAvailabilitySubheading = (waitlistOpenSpots: number, unitsAvailable: number) => {
  if (waitlistOpenSpots) {
    return `${waitlistOpenSpots} ${t("listings.waitlist.openSlots")}`
  }
  if (unitsAvailable) {
    return `${unitsAvailable} ${
      unitsAvailable === 1 ? t("listings.vacantUnit") : t("listings.vacantUnits")
    }`
  }
  return null
}

export const getAvailabilityContent = (reviewOrderType: ReviewOrderTypeEnum) => {
  switch (reviewOrderType) {
    case ReviewOrderTypeEnum.waitlist:
      return t("listings.waitlist.submitForWaitlist")
    case ReviewOrderTypeEnum.firstComeFirstServe:
      return t("listings.eligibleApplicants.FCFS")
    default:
      return t("listings.availableUnitsDescription")
  }
}

export const hasMethod = (
  applicationMethods: ApplicationMethod[],
  type: ApplicationMethodsTypeEnum
) => {
  return applicationMethods.some((method) => method.type == type)
}

export const getMethod = (
  applicationMethods: ApplicationMethod[],
  type: ApplicationMethodsTypeEnum
) => {
  return applicationMethods.find((method) => method.type == type)
}

export const getPaperApplications = (applicationMethods: ApplicationMethod[]) => {
  return (
    getMethod(applicationMethods, ApplicationMethodsTypeEnum.FileDownload)
      ?.paperApplications.sort((a, b) => {
        // Ensure English is always first
        if (a.language == "en") return -1
        if (b.language == "en") return 1

        // Otherwise, do regular string sort
        const aLang = t(`languages.${a.language}`)
        const bLang = t(`languages.${b.language}`)
        if (aLang < bLang) return -1
        if (aLang > bLang) return 1
        return 0
      })
      .map((paperApp) => {
        return {
          fileURL: paperApp?.assets?.fileId?.includes("https")
            ? paperApp?.assets?.fileId
            : cloudinaryPdfFromId(
                paperApp?.assets?.fileId || "",
                process.env.cloudinaryCloudName || ""
              ),
          languageString: t(`languages.${paperApp.language}`),
        }
      }) ?? null
  )
}

export const getOnlineApplicationURL = (
  applicationMethods: ApplicationMethod[],
  listingId: string,
  preview: boolean
) => {
  let onlineApplicationURL
  if (hasMethod(applicationMethods, ApplicationMethodsTypeEnum.Internal)) {
    onlineApplicationURL = `/applications/start/choose-language?listingId=${listingId}`
    onlineApplicationURL += `${preview ? "&preview=true" : ""}`
  } else if (hasMethod(applicationMethods, ApplicationMethodsTypeEnum.ExternalLink)) {
    onlineApplicationURL =
      getMethod(applicationMethods, ApplicationMethodsTypeEnum.ExternalLink)?.externalReference ||
      ""
  }
  return onlineApplicationURL
}

export const getHasNonReferralMethods = (listing: Listing) => {
  return listing?.applicationMethods
    ? listing.applicationMethods.some(
        (method) => method.type !== ApplicationMethodsTypeEnum.Referral
      )
    : false
}

export const getEvent = (event: ListingEventCreate, note?: string | React.ReactNode): EventType => {
  return {
    timeString: getTimeRangeString(event.startTime, event.endTime),
    dateString: dayjs(event.startDate).format("MMMM D, YYYY"),
    linkURL: event.url,
    linkText: event.label || t("listings.openHouseEvent.seeVideo"),
    note: note || event.note,
  }
}

export const getAccessibilityFeatures = (listing: Listing) => {
  let featuresExist = false
  const features = Object.keys(listing?.listingFeatures ?? {}).map((feature, index) => {
    if (listing?.listingFeatures[feature]) {
      featuresExist = true
      return `${t(`eligibility.accessibility.${feature}`)}${
        index < Object.keys(listing?.listingFeatures ?? {}).length - 1 ? ", " : ""
      }`
    }
  })
  return featuresExist ? features : null
}

export const getUtilitiesIncluded = (listing: Listing) => {
  let utilitiesExist = false
  const utilities = Object.keys(listing?.listingUtilities ?? {}).map((utility, index) => {
    if (listing?.listingUtilities[utility]) {
      utilitiesExist = true
      return `${t(`listings.utilities.${utility}`)}${
        index < Object.keys(listing?.listingUtilities ?? {}).length - 1 ? ", " : ""
      }`
    }
  })
  return utilitiesExist ? utilities : null
}

export const getFeatures = (
  listing: Listing,
  jurisdiction: Jurisdiction
): { heading: string; subheading: string }[] => {
  const features = []
  if (listing.neighborhood) {
    features.push({ heading: t("t.neighborhood"), subheading: listing.neighborhood })
  }
  if (listing.yearBuilt) {
    features.push({ heading: t("t.built"), subheading: listing.yearBuilt })
  }
  if (listing.smokingPolicy) {
    features.push({ heading: t("t.smokingPolicy"), subheading: listing.smokingPolicy })
  }
  if (listing.petPolicy) {
    features.push({ heading: t("t.petsPolicy"), subheading: listing.petPolicy })
  }
  if (listing.amenities) {
    features.push({ heading: t("t.propertyAmenities"), subheading: listing.amenities })
  }
  if (listing.unitAmenities) {
    features.push({ heading: t("t.unitAmenities"), subheading: listing.unitAmenities })
  }
  if (listing.servicesOffered) {
    features.push({ heading: t("t.servicesOffered"), subheading: listing.servicesOffered })
  }
  const accessibilityFeatures = getAccessibilityFeatures(listing)
  const enableAccessibilityFeatures = jurisdiction?.featureFlags?.some(
    (flag) => flag.name === "enableAccessibilityFeatures" && flag.active
  )
  if (accessibilityFeatures && enableAccessibilityFeatures) {
    features.push({ heading: t("t.accessibility"), subheading: accessibilityFeatures })
  }
  if (listing.accessibility) {
    features.push({ heading: t("t.additionalAccessibility"), subheading: listing.accessibility })
  }

  return features
}

export const getAmiValues = (listing: Listing) => {
  return listing?.unitsSummarized?.amiPercentages
    ? listing.unitsSummarized.amiPercentages
        .map((percent) => {
          const percentInt = parseInt(percent, 10)
          return percentInt
        })
        .sort(function (a, b) {
          return a - b
        })
    : []
}

export const getHmiData = (listing: Listing): StandardTableData => {
  return listing?.unitsSummarized?.hmi?.rows.map((row) => {
    const amiRows = Object.keys(row).reduce((acc, rowContent) => {
      acc[rowContent] = { content: row[rowContent] }
      return acc
    }, {})
    return {
      ...amiRows,
      sizeColumn: {
        content: (
          <strong>
            {listing.units[0].bmrProgramChart ? t(row["sizeColumn"]) : row["sizeColumn"]}
          </strong>
        ),
      },
    }
  })
}

export type AddressLocation = "dropOff" | "pickUp" | "mailIn"

export const getAddress = (
  addressType: ApplicationAddressTypeEnum | undefined,
  location: AddressLocation,
  listing: Listing
) => {
  const addressMap = {
    dropOff: listing.listingsApplicationDropOffAddress,
    pickUp: listing.listingsApplicationPickUpAddress,
    mailIn: listing.listingsApplicationMailingAddress,
  }
  if (addressType === ApplicationAddressTypeEnum.leasingAgent) {
    return listing.listingsLeasingAgentAddress
  }
  return addressMap[location]
}

export const getReservedTitle = (listing: Listing) => {
  if (
    listing.reservedCommunityTypes.name === "senior55" ||
    listing.reservedCommunityTypes.name === "senior62" ||
    listing.reservedCommunityTypes.name === "senior"
  ) {
    return t("listings.reservedCommunitySeniorTitle")
  } else return t("listings.reservedCommunityTitleDefault")
}

export const getDateString = (date: Date, format: string) => {
  return date ? dayjs(date).format(format) : null
}

const getBuildingSelectionCriteria = (listing: Listing) => {
  if (listing.listingsBuildingSelectionCriteriaFile) {
    return (
      <p className={"seeds-m-bs-content"}>
        <Link
          href={cloudinaryPdfFromId(
            listing.listingsBuildingSelectionCriteriaFile.fileId,
            process.env.cloudinaryCloudName
          )}
        >
          {t("listings.moreBuildingSelectionCriteria")}
        </Link>
      </p>
    )
  } else if (listing.buildingSelectionCriteria) {
    return (
      <p className={"seeds-m-bs-content"}>
        <Link href={listing.buildingSelectionCriteria}>
          {t("listings.moreBuildingSelectionCriteria")}
        </Link>
      </p>
    )
  }
}

export type EligibilitySection = {
  header: string
  subheader?: string
  content?: React.ReactNode
  note?: string
}

export const getEligibilitySections = (listing: Listing): EligibilitySection[] => {
  const eligibilityFeatures: EligibilitySection[] = []

  // Reserved community type
  if (listing.reservedCommunityTypes) {
    eligibilityFeatures.push({
      header: getReservedTitle(listing),
      content: (
        <CardList
          cardContent={[
            {
              title: t(`listings.reservedCommunityTypes.${listing.reservedCommunityTypes.name}`),
              description: listing.reservedCommunityDescription,
            },
          ]}
        />
      ),
    })
  }

  // HMI
  eligibilityFeatures.push({
    header: t("listings.householdMaximumIncome"),
    subheader: listing?.units[0]?.bmrProgramChart
      ? t("listings.forIncomeCalculationsBMR")
      : t("listings.forIncomeCalculations"),
    content: (
      <StandardTable
        headers={listing?.unitsSummarized?.hmi?.columns as TableHeaders}
        data={getHmiData(listing)}
        responsiveCollapse={true}
        translateData={true}
      />
    ),
  })

  // Occupancy
  eligibilityFeatures.push({
    header: t("t.occupancy"),
    subheader: getOccupancyDescription(listing),
    content: (
      <StandardTable
        headers={{
          unitType: "t.unitType",
          occupancy: "t.occupancy",
        }}
        data={occupancyTable(listing)}
        responsiveCollapse={false}
      />
    ),
  })

  // Rental Assistance
  if (listing.rentalAssistance) {
    eligibilityFeatures.push({
      header: t("listings.sections.rentalAssistanceTitle"),
      subheader: listing.rentalAssistance,
    })
  }

  // Preferences
  const preferences = getFilteredMultiselectQuestions(
    listing.listingMultiselectQuestions,
    MultiselectQuestionsApplicationSectionEnum.preferences
  )
  if (preferences?.length > 0) {
    eligibilityFeatures.push({
      header: t("listings.sections.housingPreferencesTitle"),
      subheader: t("listings.sections.housingPreferencesSubtitle"),
      note: t("listings.remainingUnitsAfterPreferenceConsideration"),
      content: (
        <CardList
          cardContent={preferences.map((question) => {
            return {
              title: question.multiselectQuestions.text,
              description: question.multiselectQuestions.description,
            }
          })}
          ordered={true}
        />
      ),
    })
  }

  // Programs
  const programs = getFilteredMultiselectQuestions(
    listing.listingMultiselectQuestions,
    MultiselectQuestionsApplicationSectionEnum.programs
  )
  if (programs?.length > 0) {
    eligibilityFeatures.push({
      header: t("listings.sections.housingProgramsTitle"),
      subheader: t("listings.sections.housingProgramsSubtitle"),
      note: t("listings.remainingUnitsAfterPrograms"),
      content: (
        <CardList
          cardContent={programs.map((question) => {
            return {
              title: question.multiselectQuestions.text,
              description: question.multiselectQuestions.description,
            }
          })}
        />
      ),
    })
  }

  // Additional Eligibility Rules
  if (
    listing.creditHistory ||
    listing.rentalHistory ||
    listing.criminalBackground ||
    listing.listingsBuildingSelectionCriteriaFile ||
    listing.buildingSelectionCriteria
  ) {
    const cardContent: { title: string; description: React.ReactNode }[] = []
    if (listing.creditHistory)
      cardContent.push({ title: t("listings.creditHistory"), description: listing.creditHistory })
    if (listing.rentalHistory)
      cardContent.push({ title: t("listings.rentalHistory"), description: listing.rentalHistory })
    if (listing.criminalBackground)
      cardContent.push({
        title: t("listings.criminalBackground"),
        description: listing.criminalBackground,
      })
    eligibilityFeatures.push({
      header: t("listings.sections.additionalEligibilityTitle"),
      subheader: t("listings.sections.additionalEligibilitySubtitle"),
      content: (
        <>
          <CardList cardContent={cardContent} />
          {getBuildingSelectionCriteria(listing)}
        </>
      ),
    })
  }
  return eligibilityFeatures
}

export const getAdditionalInformation = (listing: Listing) => {
  const cardContent: { title: string; description: React.ReactNode }[] = []
  if (listing.requiredDocuments)
    cardContent.push({
      title: t("listings.requiredDocuments"),
      description: (
        <Markdown children={listing.requiredDocuments} options={{ disableParsingRawHTML: true }} />
      ),
    })
  if (listing.programRules)
    cardContent.push({
      title: t("listings.importantProgramRules"),
      description: (
        <Markdown children={listing.programRules} options={{ disableParsingRawHTML: true }} />
      ),
    })
  if (listing.specialNotes)
    cardContent.push({
      title: t("listings.specialNotes"),
      description: (
        <Markdown children={listing.specialNotes} options={{ disableParsingRawHTML: true }} />
      ),
    })
  return cardContent
}

export const dateSection = (heading: string, events: EventType[]) => {
  if (!events.length) return
  return (
    <Card className={styles["mobile-full-width-card"]}>
      <Card.Section>
        <Heading size={"lg"} priority={2} className={"seeds-p-be-header"}>
          {heading}
        </Heading>
        {events.map((openHouseEvent, index) => {
          return (
            <>
              {openHouseEvent.dateString && (
                <div
                  className={`${styles["slim-heading"]} seeds-m-be-text ${
                    index > 0 && `seeds-m-bs-4`
                  }`}
                >
                  {openHouseEvent.dateString}
                </div>
              )}
              {openHouseEvent.timeString && (
                <div className={"seeds-m-be-text"}>{openHouseEvent.timeString}</div>
              )}
              {openHouseEvent.linkText && openHouseEvent.linkURL && (
                <div className={"seeds-m-be-text"}>
                  <Link href={openHouseEvent.linkURL} hideExternalLinkIcon={true}>
                    {openHouseEvent.linkText}
                  </Link>
                </div>
              )}
              {openHouseEvent.note && (
                <div className={"seeds-m-be-text"}>{openHouseEvent.note}</div>
              )}
            </>
          )
        })}
      </Card.Section>
    </Card>
  )
}

type ListingTag = {
  title: string
  variant: TagVariant
}

export const getListingTags = (listing: Listing): ListingTag[] => {
  const listingTags: ListingTag[] = []
  if (listing.reservedCommunityTypes) {
    listingTags.push({
      title: t(`listings.reservedCommunityTypes.${listing.reservedCommunityTypes.name}`),
      variant: "highlight-warm",
    })
  }
  if (listing.reviewOrderType === ReviewOrderTypeEnum.waitlist) {
    listingTags.push({
      title: t("listings.waitlist.open"),
      variant: "primary",
    })
  }
  if (listing.reviewOrderType === ReviewOrderTypeEnum.firstComeFirstServe) {
    listingTags.push({
      title: t("listings.availableUnits"),
      variant: "primary",
    })
  }
  return listingTags
}

interface PaperApplicationDialogProps {
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
  register: UseFormMethods["register"]
  paperApplications: {
    fileURL: string
    languageString: string
  }[]
  paperApplicationUrl: string
  listingName: string
}

export const PaperApplicationDialog = (props: PaperApplicationDialogProps) => {
  return (
    <Dialog
      isOpen={!!props.showDialog}
      onClose={() => props.setShowDialog(false)}
      ariaLabelledBy="get-application-header"
    >
      <Dialog.Header id="get-application-header">{t("listings.chooseALanguage")}</Dialog.Header>
      <Dialog.Content>
        <Form>
          <fieldset>
            <legend className="sr-only">{t("listings.chooseALanguage")}</legend>
            <FieldGroup
              name="paperApplicationLanguage"
              fieldGroupClassName="grid grid-cols-1"
              fieldClassName="ml-0"
              type="radio"
              register={props.register}
              validation={{ required: true }}
              fields={props.paperApplications?.map((app, index) => ({
                id: app.languageString,
                label: app.languageString,
                value: app.fileURL,
                defaultChecked: index === 0,
              }))}
              dataTestId={"paper-application-language"}
            />
          </fieldset>
        </Form>
      </Dialog.Content>
      <Dialog.Footer>
        <Button
          variant="primary"
          size="sm"
          onClick={async () => {
            await downloadExternalPDF(props.paperApplicationUrl, props.listingName)
            props.setShowDialog(false)
          }}
        >
          {t("t.download")}
        </Button>
        <Button
          variant="primary-outlined"
          size="sm"
          onClick={() => {
            props.setShowDialog(false)
          }}
        >
          {t("t.cancel")}
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}
