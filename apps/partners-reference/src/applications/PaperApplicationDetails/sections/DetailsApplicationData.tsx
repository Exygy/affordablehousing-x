import React, { useContext, useMemo } from "react"
import moment from "moment"
import { t, GridSection, ViewItem, GridCell } from "@bloom-housing/ui-components"
import { DetailsApplicationContext } from "../DetailsApplicationContext"

const DetailsApplicationData = () => {
  const application = useContext(DetailsApplicationContext)

  const applicationDate = useMemo(() => {
    if (!application) return null

    const momentDate = moment(application.submissionDate)
    const date = momentDate.format("MM/DD/YYYY")
    const time = momentDate.format("HH:mm:ss A")

    if (!momentDate.isValid()) {
      return {
        date: t("t.n/a"),
        time: t("t.n/a"),
      }
    }

    return {
      date,
      time,
    }
  }, [application])

  return (
    <GridSection
      className="bg-primary-lighter"
      title={t("application.details.applicationData")}
      inset
    >
      <GridCell>
        <ViewItem label={t("application.details.number")}>{application.id}</ViewItem>
      </GridCell>

      {application.submissionType && (
        <GridCell>
          <ViewItem label={t("application.details.type")}>
            {t(`application.details.submissionType.${application.submissionType}`)}
          </ViewItem>
        </GridCell>
      )}

      <GridCell>
        <ViewItem label={t("application.details.submittedDate")}>{applicationDate.date}</ViewItem>
      </GridCell>

      <GridCell>
        <ViewItem label={t("application.details.timeDate")}>{applicationDate.time}</ViewItem>
      </GridCell>

      <GridCell>
        <ViewItem label={t("application.details.language")}>
          {application.language ? t(`languages.${application.language}`) : t("t.n/a")}
        </ViewItem>
      </GridCell>

      <GridCell>
        <ViewItem label={t("application.details.totalSize")}>
          {!application.householdSize ? 1 : application.householdSize + 1}
        </ViewItem>
      </GridCell>

      <GridCell>
        <ViewItem label={t("application.details.submittedBy")}>
          {application.applicant.firstName && application.applicant.lastName
            ? `${application.applicant.firstName} ${application.applicant.lastName}`
            : t("t.n/a")}
        </ViewItem>
      </GridCell>
    </GridSection>
  )
}

export { DetailsApplicationData as default, DetailsApplicationData }
