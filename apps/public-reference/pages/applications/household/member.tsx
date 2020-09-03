/*
2.2 - Add Members
Add household members
*/
import Router, { useRouter } from "next/router"
import {
  Button,
  DOBField,
  Field,
  FormCard,
  ProgressNav,
  t,
  ErrorMessage,
  FormOptions,
  FieldGroup,
  relationshipKeys,
  Form,
} from "@bloom-housing/ui-components"
import { HouseholdMember } from "@bloom-housing/core"
import FormsLayout from "../../../layouts/forms"
import { useForm } from "react-hook-form"
import { AppSubmissionContext } from "../../../lib/AppSubmissionContext"
import ApplicationConductor from "../../../lib/ApplicationConductor"
import { useContext, useMemo } from "react"
import { Select } from "@bloom-housing/ui-components/src/forms/Select"
import { stateKeys } from "@bloom-housing/ui-components/src/helpers/formOptions"

class Member implements HouseholdMember {
  id: number
  firstName = ""
  middleName = ""
  lastName = ""
  birthMonth = null
  birthDay = null
  birthYear = null
  emailAddress = ""
  noEmail = null
  phoneNumber = ""
  phoneNumberType = ""
  noPhone = null

  constructor(id) {
    this.id = id
  }
  address = {
    placeName: null,
    city: "",
    county: "",
    state: "string",
    street: "",
    street2: "",
    zipCode: "",
    latitude: null,
    longitude: null,
  }
  workAddress = {
    placeName: null,
    city: "",
    county: "",
    state: "string",
    street: "",
    street2: "",
    zipCode: "",
    latitude: null,
    longitude: null,
  }
  sameAddress?: boolean
  relationship?: string
  workInRegion?: boolean
}

export default () => {
  let memberId, member, saveText, cancelText
  const { conductor, application, listing } = useContext(AppSubmissionContext)
  const router = useRouter()
  const currentPageStep = 2

  if (router.query.memberId) {
    memberId = parseInt(router.query.memberId.toString())
    member = application.householdMembers[memberId]
    saveText = t("application.household.member.updateHouseholdMember")
    cancelText = t("application.household.member.deleteThisPerson")
  } else {
    memberId = application.householdMembers.length
    member = new Member(memberId)
    saveText = t("application.household.member.saveHouseholdMember")
    cancelText = t("application.household.member.cancelAddingThisPerson")
  }

  /* Form Handler */
  const { register, handleSubmit, errors, watch } = useForm()
  const onSubmit = (data) => {
    application.householdMembers[memberId] = { ...member, ...data } as HouseholdMember
    conductor.sync()
    Router.push("/applications/household/add-members").then(() => window.scrollTo(0, 0))
  }
  const deleteMember = () => {
    if (member.id != undefined) {
      application.householdMembers.splice(member.id, 1)
      conductor.sync()
    }
    Router.push("/applications/household/add-members").then(() => window.scrollTo(0, 0))
  }

  const sameAddress = watch("sameAddress")
  const workInRegion = watch("workInRegion")

  const sameAddressOptions = [
    {
      id: "sameAddressYes",
      label: t("t.yes"),
      value: "yes",
      defaultChecked: member.sameAddress === "yes",
    },
    {
      id: "sameAddressNo",
      label: t("t.no"),
      value: "no",
      defaultChecked: member.sameAddress === "no",
    },
  ]

  const workInRegionOptions = [
    {
      id: "workInRegionYes",
      label: t("t.yes"),
      value: "yes",
      defaultChecked: member.workInRegion === "yes",
    },
    {
      id: "workInRegionNo",
      label: t("t.no"),
      value: "no",
      defaultChecked: member.workInRegion === "no",
    },
  ]

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
        <div className="form-card__lead border-b">
          <h2 className="form-card__title is-borderless">
            {t("application.household.member.title")}
          </h2>
          <p className="mt-4 field-note">{t("application.household.member.subTitle")}</p>
        </div>

        {member && (
          <Form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-card__group border-b">
              <fieldset>
                <legend className="field-label--caps" htmlFor="firstName">{t("application.household.member.name")}</legend>

                <Field
                  name="firstName"
                  label={t("application.name.firstName")}
                  placeholder={t("application.name.firstName")}
                  readerOnly={true}
                  controlClassName="mt-2"
                  defaultValue={member.firstName}
                  validation={{ required: true }}
                  error={errors.firstName}
                  errorMessage={t("application.name.firstNameError")}
                  register={register}
                />

                <Field
                  name="middleName"
                  label={t("application.name.middleName")}
                  placeholder={t("application.name.middleName")}
                  readerOnly={true}
                  defaultValue={member.middleName}
                  register={register}
                />

                <Field
                  name="lastName"
                  label={t("application.name.lastName")}
                  placeholder={t("application.name.lastName")}
                  readerOnly={true}
                  defaultValue={member.lastName}
                  validation={{ required: true }}
                  error={errors.lastName}
                  errorMessage={t("application.name.lastNameError")}
                  register={register}
                />
              </fieldset>
            </div>

            <div className="form-card__group border-b">
              <DOBField
                applicant={member}
                register={register}
                error={errors}
                watch={watch}
                label={t("application.household.member.dateOfBirth")}
              />
            </div>

            <div className="form-card__group border-b">
              <FieldGroup
                name="sameAddress"
                groupLabel={t("application.household.member.haveSameAddress")}
                type="radio"
                register={register}
                validation={{ required: true }}
                error={errors.sameAddress}
                errorMessage={t("application.form.errors.selectOption")}
                fields={sameAddressOptions}
              />

              {(sameAddress == "no" || (!sameAddress && member.sameAddress == "no")) && (
                <>
                  <fieldset>
                    <legend className="field-label--caps">{t("application.contact.address")}</legend>

                    <Field
                      id="addressStreet"
                      name="address.street"
                      placeholder={t("application.contact.streetAddress")}
                      defaultValue={member.address.street}
                      validation={{ required: true }}
                      error={errors.address?.street}
                      errorMessage={t("application.contact.streetError")}
                      register={register}
                    />

                    <Field
                      id="addressStreet2"
                      name="address.street2"
                      label={t("application.contact.apt")}
                      placeholder={t("application.contact.apt")}
                      defaultValue={member.address.street2}
                      register={register}
                    />

                    <div className="flex max-w-2xl">
                      <Field
                        id="addressCity"
                        name="address.city"
                        label={t("application.contact.cityName")}
                        placeholder={t("application.contact.cityName")}
                        defaultValue={member.address.city}
                        validation={{ required: true }}
                        error={errors.address?.city}
                        errorMessage={t("application.contact.cityError")}
                        register={register}
                      />

                      <Select
                        id="addressState"
                        name="address.state"
                        label={t("application.contact.state")}
                        defaultValue={member.address.state}
                        validation={{ required: true }}
                        error={errors.address?.state}
                        errorMessage={t("application.contact.stateError")}
                        register={register}
                        controlClassName="control"
                        options={stateKeys}
                        keyPrefix="application.form.options.states"
                      />
                    </div>

                    <Field
                      id="addressZipCode"
                      name="address.zipCode"
                      label={t("application.contact.zip")}
                      placeholder={t("application.contact.zipCode")}
                      defaultValue={member.address.zipCode}
                      validation={{ required: true }}
                      error={errors.address?.zipCode}
                      errorMessage={t("application.contact.zipCodeError")}
                      register={register}
                    />
                  </fieldset>
                </>
              )}
            </div>

            <div className="form-card__group border-b">
              <FieldGroup
                name="workInRegion"
                groupLabel={t("application.household.member.workInRegion")}
                groupNote={t("application.household.member.workInRegionNote")}
                type="radio"
                register={register}
                validation={{ required: true }}
                error={errors.workInRegion}
                errorMessage={t("application.form.errors.selectOption")}
                fields={workInRegionOptions}
              />

              {(workInRegion == "yes" || (!workInRegion && member.workInRegion == "yes")) && (
                <>
                  <fieldset>
                    <legend className="field-label--caps">{t("application.contact.address")}</legend>

                    <Field
                      id="addressStreet"
                      name="workAddress.street"
                      placeholder={t("application.contact.streetAddress")}
                      defaultValue={member.workAddress.street}
                      validation={{ required: true }}
                      error={errors.workAddress?.street}
                      errorMessage={t("application.contact.streetError")}
                      register={register}
                    />

                    <Field
                      id="addressStreet2"
                      name="workAddress.street2"
                      label={t("application.contact.apt")}
                      placeholder={t("application.contact.apt")}
                      defaultValue={member.workAddress.street2}
                      register={register}
                    />

                    <div className="flex max-w-2xl">
                      <Field
                        id="addressCity"
                        name="workAddress.city"
                        label={t("application.contact.cityName")}
                        placeholder={t("application.contact.cityName")}
                        defaultValue={member.workAddress.city}
                        validation={{ required: true }}
                        error={errors.workAddress?.city}
                        errorMessage={t("application.contact.cityError")}
                        register={register}
                      />

                      <Select
                        id="addressState"
                        name="workAddress.state"
                        label={t("application.contact.state")}
                        defaultValue={member.workAddress.state}
                        validation={{ required: true }}
                        error={errors.workAddress?.state}
                        errorMessage={t("application.contact.stateError")}
                        register={register}
                        controlClassName="control"
                        options={stateKeys}
                        keyPrefix="application.form.options.states"
                      />
                    </div>

                    <Field
                      id="addressZipCode"
                      name="workAddress.zipCode"
                      label={t("application.contact.zip")}
                      placeholder={t("application.contact.zipCode")}
                      defaultValue={member.workAddress.zipCode}
                      validation={{ required: true }}
                      error={errors.workAddress?.zipCode}
                      errorMessage={t("application.contact.zipCodeError")}
                      register={register}
                    />
                  </fieldset>
                </>
              )}
            </div>

            <div className="form-card__group">
              <Select
                id="relationship"
                name="relationship"
                label={t("application.household.member.whatIsTheirRelationship")}
                labelClassName={"field-label--caps"}
                defaultValue={member.relationship}
                validation={{ required: true }}
                error={errors.relationship}
                errorMessage={t("application.form.errors.selectOption")}
                register={register}
                controlClassName="control"
                options={relationshipKeys}
                keyPrefix="application.form.options.relationship"
              />
            </div>

            <div className="form-card__pager">
              <div className="form-card__pager-row primary">
                <Button
                  filled={true}
                  className=""
                  onClick={() => {
                    //
                  }}
                >
                  {saveText}
                </Button>
              </div>
              <div className="form-card__pager-row py-8">
                <a href="#" className="lined text-tiny" onClick={deleteMember}>
                  {cancelText}
                </a>
              </div>
            </div>
          </Form>
        )}
      </FormCard>
    </FormsLayout>
  )
}
