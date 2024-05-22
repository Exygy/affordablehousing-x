import React, { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { t, Select, FieldGroup } from "@bloom-housing/ui-components"
import { Grid } from "@bloom-housing/ui-seeds"
import { ethnicityKeys, raceKeys, howDidYouHear } from "@bloom-housing/shared-helpers"
import { Demographic } from "@bloom-housing/shared-helpers/src/types/backend-swagger"
import SectionWithGrid from "../../../shared/SectionWithGrid"

type FormDemographicsProps = {
  formValues: Demographic
}

const FormDemographics = ({ formValues }: FormDemographicsProps) => {
  const formMethods = useFormContext()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, getValues } = formMethods

  const howDidYouHearOptions = useMemo(() => {
    return howDidYouHear?.map((item) => ({
      id: item.id,
      label: t(`application.review.demographics.howDidYouHearOptions.${item.id}`),
      register,
    }))
  }, [register])

  // Does a key exist in a root field or a sub array
  const isKeyIncluded = (raceKey: string) => {
    let keyExists = false
    const curValues = getValues()
    if (typeof curValues === "object" && !curValues) {
      Object.entries(curValues).forEach(([key, _]) => {
        if (key.includes(raceKey)) {
          keyExists = true
        }
      })
    } else {
      formValues?.race?.forEach((value) => {
        if (value.includes(raceKey)) {
          keyExists = true
        }
      })
    }
    return keyExists
  }

  // Get the value of a field that is storing a custom value, i.e. "otherAsian: Custom Race Input"
  const getCustomValue = (subKey: string) => {
    const curValues = getValues()
    let customValues
    if (typeof curValues === "object" && !curValues) {
      customValues = Object.entries(curValues).filter(([key, _]) => key.split(":")[0] === subKey)
    } else {
      customValues = formValues?.race?.filter((value) => value.split(":")[0] === subKey)
    }
    return customValues?.length ? customValues[0].split(":")[1]?.substring(1) : ""
  }

  const raceOptions = useMemo(() => {
    return Object.keys(raceKeys).map((rootKey) => ({
      id: rootKey,
      label: t(`application.review.demographics.raceOptions.${rootKey}`),
      value: rootKey,
      additionalText: rootKey.indexOf("other") >= 0,
      defaultChecked: isKeyIncluded(rootKey),
      defaultText: getCustomValue(rootKey),
      subFields: raceKeys[rootKey].map((subKey) => ({
        id: subKey,
        label: t(`application.review.demographics.raceOptions.${subKey}`),
        value: subKey,
        defaultChecked: isKeyIncluded(subKey),
        additionalText: subKey.indexOf("other") >= 0,
        defaultText: getCustomValue(subKey),
      })),
    }))
  }, [register])

  return (
    <>
      <hr className="spacer-section-above spacer-section" />
      <SectionWithGrid heading={t("application.add.demographicsInformation")}>
        <Grid.Row>
          <Grid.Cell>
            <FieldGroup
              name="race"
              fields={raceOptions}
              type="checkbox"
              register={register}
              groupLabel={t("application.add.race")}
              strings={{
                description: "",
              }}
            />
          </Grid.Cell>
          <Grid.Cell>
            <Select
              id="application.demographics.ethnicity"
              name="application.demographics.ethnicity"
              placeholder={t("t.selectOne")}
              label={t("application.add.ethnicity")}
              register={register}
              controlClassName="control"
              options={ethnicityKeys}
              keyPrefix="application.review.demographics.ethnicityOptions"
            />
          </Grid.Cell>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Cell>
            <FieldGroup
              type="checkbox"
              name="application.demographics.howDidYouHear"
              fields={howDidYouHearOptions}
              register={register}
              groupLabel={t("application.add.howDidYouHearAboutUs")}
              fieldGroupClassName="grid grid-cols-2 mt-4"
            />
          </Grid.Cell>
        </Grid.Row>
      </SectionWithGrid>
    </>
  )
}

export { FormDemographics as default, FormDemographics }
