/*
1.4 - Alternate Contact
Type of alternate contact
*/
import Link from "next/link"
import Router from "next/router"
import { Button, ErrorMessage, Field, FormCard, ProgressNav, t } from "@bloom-housing/ui-components"
import FormsLayout from "../../../layouts/forms"
import { useForm } from "react-hook-form"
import { AppSubmissionContext } from "../../../lib/AppSubmissionContext"
import ApplicationConductor from "../../../lib/ApplicationConductor"
import { useContext, useMemo, Fragment } from "react"

export default () => {
  const { conductor, application, listing } = useContext(AppSubmissionContext)
  const currentPageStep = 1
  /* Form Handler */
  const { register, handleSubmit, errors, watch } = useForm<Record<string, any>>()
  const onSubmit = (data) => {
    application.alternateContact.type = data.type
    conductor.completeStep(1)
    conductor.sync()
    if (data.type == "noContact") {
      conductor.routeTo("/applications/household/live-alone")
    } else {
      conductor.routeTo("/applications/contact/alternate-contact-name")
    }
  }
  const options = ["familyMember", "friend", "caseManager", "other", "noContact"]
  const type = watch("type")

  return (
    <FormsLayout>
      <FormCard header={listing?.name}>
        <ProgressNav
          currentPageStep={currentPageStep}
          completedSteps={application.completedStep}
          labels={["You", "Household", "Income", "Preferences", "Review"]}
        />
      </FormCard>
      <FormCard>
        <p className="form-card__back">
          <strong>
            <Link href="/applications/contact/address">
              <a>Back</a>
            </Link>
          </strong>
        </p>
        <div className="form-card__lead border-b">
          <h2 className="form-card__title is-borderless">
            {t("application.alternateContact.type.title")}
          </h2>
          <p className="field-note mt-4">{t("application.alternateContact.type.description")}</p>
        </div>
        <form id="applications-contact-alternate-type" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-card__group">
            <label className="field-label--caps" htmlFor="type">
              {t("application.alternateContact.type.label")}
            </label>
            <p className="field-note mt-2 mb-4">
              {t("application.alternateContact.type.helperText")}
            </p>
            {options.map((option, i) => {
              return (
                <Fragment key={option}>
                  <Field
                    key={option}
                    type="radio"
                    id={"type" + option}
                    name="type"
                    label={t("application.alternateContact.type.options." + option)}
                    register={register}
                    validation={{ required: true }}
                    error={errors.type}
                    inputProps={{
                      value: option,
                      defaultChecked: application.alternateContact.type === option,
                    }}
                  />

                  {option === "other" && type === "other" && (
                    <Field
                      controlClassName="mt-4"
                      id="otherType"
                      name="otherType"
                      placeholder={t("application.alternateContact.type.otherTypeFormPlaceholder")}
                      defaultValue={application.alternateContact.otherType}
                      validation={{ required: true }}
                      error={errors.otherType}
                      errorMessage={t(
                        "application.alternateContact.type.otherTypeValidationErrorMessage"
                      )}
                      register={register}
                    />
                  )}
                  {i === options.length - 1 && (
                    <ErrorMessage error={errors.type}>
                      {t("application.alternateContact.type.validationErrorMessage")}
                    </ErrorMessage>
                  )}
                </Fragment>
              )
            })}
          </div>
          <div className="form-card__pager">
            <div className="form-card__pager-row primary">
              <Button
                filled={true}
                onClick={() => {
                  //
                }}
              >
                {t("t.next")}
              </Button>
            </div>
          </div>
        </form>
      </FormCard>
    </FormsLayout>
  )
}
