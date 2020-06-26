/*
1.2 - Name
Primary applicant details. Name, DOB and Email Address
https://github.com/bloom-housing/bloom/issues/255
*/
import Router from "next/router"
import { Button, Field, FormCard, ProgressNav, t } from "@bloom-housing/ui-components"
import FormsLayout from "../../../layouts/forms"
import { useForm } from "react-hook-form"
import { AppSubmissionContext } from "../../../lib/AppSubmissionContext"
import ApplicationConductor from "../../../lib/ApplicationConductor"
import FormStep from "../../../src/forms/applications/FormStep"
import { useContext } from "react"
import { emailRegex } from "../../../lib/emailRegex"

export default () => {
  const context = useContext(AppSubmissionContext)
  const { application } = context
  const conductor = new ApplicationConductor(application, context)
  const currentPageStep = 1

  /* Form Handler */
  const { register, handleSubmit, setValue, watch, errors } = useForm({
    defaultValues: {
      noEmail: application.noEmail,
    },
  })
  const onSubmit = (data) => {
    new FormStep(conductor).save(data)

    Router.push("/applications/contact/address").then(() => window.scrollTo(0, 0))
  }

  const noEmail = watch("noEmail")

  return (
    <FormsLayout>
      <FormCard header="LISTING">
        <ProgressNav
          currentPageStep={currentPageStep}
          completedSteps={application.completedStep}
          totalNumberOfSteps={conductor.totalNumberOfSteps()}
          labels={["You", "Household", "Income", "Preferences", "Review"]}
        />
      </FormCard>

      <FormCard>
        <div className="form-card__lead border-b">
          <h2 className="form-card__title is-borderless">{t("application.name.title")}</h2>
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-card__group border-b">
            <label className="field-label--caps" htmlFor="firstName">
              {t("application.name.yourName")}
            </label>

            <Field
              name="firstName"
              placeholder={t("application.name.firstName")}
              controlClassName="mt-2"
              defaultValue={application.firstName}
              validation={{ required: true }}
              error={errors.firstName}
              errorMessage={t("application.name.firstNameError")}
              register={register}
            />

            <Field
              name="middleName"
              placeholder={t("application.name.middleName")}
              defaultValue={application.middleName}
              register={register}
            />

            <Field
              name="lastName"
              placeholder={t("application.name.lastName")}
              defaultValue={application.lastName}
              validation={{ required: true }}
              error={errors.lastName}
              errorMessage={t("application.name.lastNameError")}
              register={register}
            />
          </div>

          <div className="form-card__group border-b">
            <label className="field-label--caps" htmlFor="birthMonth">
              {t("application.name.yourDateOfBirth")}
            </label>

            <div className="field-group--dob mt-2">
              <Field
                name="birthMonth"
                placeholder="MM"
                defaultValue={"" + (application.birthMonth > 0 ? application.birthMonth : "")}
                error={errors.birthMonth}
                validation={{
                  required: true,
                  validate: {
                    monthRange: (value) => parseInt(value) > 0 && parseInt(value) <= 12,
                  },
                }}
                register={register}
              />
              <Field
                name="birthDay"
                placeholder="DD"
                defaultValue={"" + (application.birthDay > 0 ? application.birthDay : "")}
                error={errors.birthDay}
                validation={{
                  required: true,
                  validate: {
                    dayRange: (value) => parseInt(value) > 0 && parseInt(value) <= 31,
                  },
                }}
                register={register}
              />
              <Field
                name="birthYear"
                placeholder="YYYY"
                defaultValue={"" + (application.birthYear > 0 ? application.birthYear : "")}
                error={errors.birthYear}
                validation={{
                  required: true,
                  validate: {
                    yearRange: (value) =>
                      parseInt(value) > 1900 && parseInt(value) <= new Date().getFullYear() - 18,
                  },
                }}
                register={register}
              />
            </div>

            {(errors.birthMonth || errors.birthDay || errors.birthYear) && (
              <div className="field error">
                <span className="error-message">{t("application.name.dateOfBirthError")}</span>
              </div>
            )}
          </div>

          <div className="form-card__group">
            <label className="field-label--caps" htmlFor="emailAddress">
              {t("application.name.yourEmailAddress")}
            </label>

            <p className="field-note my-2">{t("application.name.emailPrivacy")}</p>

            <Field
              type="email"
              name="emailAddress"
              placeholder={noEmail ? t("t.none") : "example@web.com"}
              defaultValue={application.emailAddress}
              validation={{ pattern: emailRegex }}
              error={errors.emailAddress}
              errorMessage={t("application.name.emailAddressError")}
              register={register}
              disabled={noEmail}
            />

            <div className="field">
              <input
                type="checkbox"
                id="noEmail"
                name="noEmail"
                defaultChecked={application.noEmail}
                ref={register}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue("emailAddress", "")
                  }
                }}
              />
              <label htmlFor="noEmail" className="text-primary font-semibold">
                {t("application.name.noEmailAddress")}
              </label>
            </div>
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
