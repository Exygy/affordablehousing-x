import React from "react"
import { useFormContext } from "react-hook-form"
import { t, GridSection, Textarea } from "@bloom-housing/ui-components"

const AdditionalDetails = () => {
  const formMethods = useFormContext()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register } = formMethods

  return (
    <div>
      <GridSection
        grid={false}
        separator
        title={t("listings.sections.additionalDetails")}
        description={t("listings.sections.additionalDetailsSubtitle")}
      >
        <GridSection columns={2}>
          <Textarea
            label={t("listings.requiredDocuments")}
            name={"requiredDocuments"}
            id={"requiredDocuments"}
            fullWidth={true}
            register={register}
            maxLength={1000}
          />
          <Textarea
            label={t("listings.importantProgramRules")}
            name={"programRules"}
            id={"programRules"}
            fullWidth={true}
            register={register}
            maxLength={1000}
          />
        </GridSection>
        <GridSection columns={2}>
          <Textarea
            label={t("listings.specialNotes")}
            name={"specialNotes"}
            id={"specialNotes"}
            fullWidth={true}
            register={register}
            maxLength={1000}
          />
        </GridSection>
      </GridSection>
    </div>
  )
}

export default AdditionalDetails
