import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { Alert, Button, FormErrorMessage } from "@bloom-housing/ui-seeds"
import {
  DOBField,
  Field,
  FieldGroup,
  Form,
  FormOptions,
  Select,
  t,
} from "@bloom-housing/ui-components"
import { CardSection } from "@bloom-housing/ui-seeds/src/blocks/Card"
import {
  HouseholdMember,
  HouseholdMemberUpdate,
  YesNoEnum,
} from "@bloom-housing/shared-helpers/src/types/backend-swagger"
import {
  OnClientSide,
  PageView,
  pushGtmEvent,
  relationshipKeys,
  stateKeys,
  AuthContext,
} from "@bloom-housing/shared-helpers"
import FormsLayout from "../../../layouts/forms"
import { useForm } from "react-hook-form"
import { AppSubmissionContext } from "../../../lib/applications/AppSubmissionContext"
import { UserStatus } from "../../../lib/constants"
import ApplicationFormLayout from "../../../layouts/application-form"
import styles from "../../../layouts/application-form.module.scss"

export class Member implements HouseholdMemberUpdate {
  id: string
  orderId = undefined as number | undefined
  firstName = ""
  middleName = ""
  lastName = ""
  birthMonth = undefined
  birthDay = undefined
  birthYear = undefined
  emailAddress = ""
  noEmail = undefined
  phoneNumber = ""
  phoneNumberType = ""
  noPhone = undefined

  constructor(orderId: number) {
    this.orderId = orderId
  }
  householdMemberAddress = {
    placeName: undefined,
    city: "",
    county: "",
    state: "",
    street: "",
    street2: "",
    zipCode: "",
    latitude: undefined,
    longitude: undefined,
  }
  householdMemberWorkAddress = {
    placeName: undefined,
    city: "",
    county: "",
    state: "",
    street: "",
    street2: "",
    zipCode: "",
    latitude: undefined,
    longitude: undefined,
  }
  sameAddress?: YesNoEnum
  relationship?: string
  workInRegion?: YesNoEnum
}

const ApplicationMember = () => {
  const { profile } = useContext(AuthContext)
  let memberId, member, saveText, cancelText
  const { conductor, application, listing } = useContext(AppSubmissionContext)
  const router = useRouter()
  const currentPageSection = 2

  if (router.query.memberId) {
    memberId = parseInt(router.query.memberId.toString())
    member = application.householdMember[memberId]
    saveText = t("application.household.member.updateHouseholdMember")
    cancelText = t("application.household.member.deleteThisPerson")
  } else {
    memberId = application.householdMember.length
    member = new Member(memberId)
    saveText = t("application.household.member.saveHouseholdMember")
    cancelText = t("application.household.member.cancelAddingThisPerson")
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch, trigger } = useForm({
    shouldFocusError: false,
  })
  const onSubmit = async (data) => {
    const validation = await trigger()
    if (!validation) return

    application.householdMember[memberId] = { ...member, ...data } as HouseholdMember
    conductor.sync()
    void router.push("/applications/household/add-members")
  }
  const onError = () => {
    window.scrollTo(0, 0)
  }
  const deleteMember = () => {
    if (member.orderId != undefined) {
      application.householdMember = application.householdMember.reduce((acc, householdMember) => {
        if (householdMember.orderId !== member.orderId) {
          acc.push({
            ...householdMember,
            orderId: acc.length,
          })
        }
        return acc
      }, [])
      conductor.sync()
    }
    void router.push("/applications/household/add-members")
  }

  const sameAddress = watch("sameAddress")
  const workInRegion = watch("workInRegion")

  const sameAddressOptions = [
    {
      id: "sameAddressYes",
      label: t("t.yes"),
      value: "yes",
      defaultChecked: member?.sameAddress === "yes",
    },
    {
      id: "sameAddressNo",
      label: t("t.no"),
      value: "no",
      defaultChecked: member?.sameAddress === "no",
    },
  ]

  const workInRegionOptions = [
    {
      id: "workInRegionYes",
      label: t("t.yes"),
      value: "yes",
      defaultChecked: member?.workInRegion === "yes",
    },
    {
      id: "workInRegionNo",
      label: t("t.no"),
      value: "no",
      defaultChecked: member?.workInRegion === "no",
    },
  ]

  useEffect(() => {
    pushGtmEvent<PageView>({
      event: "pageView",
      pageTitle: "Application - Add Household Members",
      status: profile ? UserStatus.LoggedIn : UserStatus.NotLoggedIn,
    })
  }, [profile])

  return (
    <FormsLayout>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <ApplicationFormLayout
          listingName={listing?.name}
          heading={t("application.household.member.title")}
          subheading={t("application.household.member.subTitle")}
          progressNavProps={{
            currentPageSection: currentPageSection,
            completedSections: application.completedSections,
            labels: conductor.config.sections.map((label) => t(`t.${label}`)),
            mounted: OnClientSide(),
          }}
        >
          {Object.entries(errors).length > 0 && (
            <Alert
              className={styles["message-inside-card"]}
              variant="alert"
              fullwidth
              id={"application-alert-box"}
            >
              {t("errors.errorsToResolve")}
            </Alert>
          )}

          <CardSection divider={"inset"}>
            <fieldset>
              <legend className="text__caps-spaced">
                {t("application.household.member.name")}
              </legend>

              <Field
                id="firstName"
                name="firstName"
                label={t("application.contact.givenName")}
                defaultValue={member.firstName}
                validation={{ required: true, maxLength: 64 }}
                error={errors.firstName}
                errorMessage={
                  errors.firstName?.type === "maxLength"
                    ? t("errors.maxLength")
                    : t("errors.givenNameError")
                }
                register={register}
                dataTestId={"app-household-member-first-name"}
              />

              <Field
                id="middleName"
                name="middleName"
                label={t("application.name.middleNameOptional")}
                defaultValue={member.middleName}
                validation={{ maxLength: 64 }}
                error={errors.middleName}
                errorMessage={t("errors.maxLength")}
                register={register}
                dataTestId={"app-household-member-middle-name"}
              />

              <Field
                id="lastName"
                name="lastName"
                label={t("application.contact.familyName")}
                defaultValue={member.lastName}
                validation={{ required: true, maxLength: 64 }}
                error={errors.lastName}
                errorMessage={
                  errors.lastName?.type === "maxLength"
                    ? t("errors.maxLength")
                    : t("errors.familyNameError")
                }
                register={register}
                dataTestId={"app-household-member-last-name"}
              />
            </fieldset>
          </CardSection>

          <CardSection divider={"inset"}>
            <DOBField
              id="applicant.member.dateOfBirth"
              required={true}
              defaultDOB={{
                birthDay: member.birthDay,
                birthMonth: member.birthMonth,
                birthYear: member.birthYear,
              }}
              register={register}
              error={errors}
              watch={watch}
              label={t("application.household.member.dateOfBirth")}
            />
          </CardSection>

          <CardSection divider={"inset"}>
            <fieldset>
              <legend className="text__caps-spaced">
                {t("application.household.member.haveSameAddress")}
              </legend>
              <FieldGroup
                fieldGroupClassName="grid grid-cols-1"
                fieldClassName="ml-0"
                name="sameAddress"
                type="radio"
                register={register}
                validation={{ required: true }}
                error={errors.sameAddress}
                errorMessage={t("errors.selectOption")}
                fields={sameAddressOptions}
                dataTestId={"app-household-member-same-address"}
              />
            </fieldset>

            {(sameAddress == "no" || (!sameAddress && member.sameAddress == "no")) && (
              <fieldset className="mt-8">
                <legend className="text__caps-spaced">{t("application.contact.address")}</legend>

                <Field
                  id="addressStreet"
                  name="address.street"
                  defaultValue={member.householdMemberAddress.street}
                  validation={{ required: true, maxLength: 64 }}
                  errorMessage={
                    errors.address?.street?.type === "maxLength"
                      ? t("errors.maxLength")
                      : t("errors.streetError")
                  }
                  error={errors.address?.street}
                  register={register}
                  dataTestId={"app-household-member-address-street"}
                  label={t("application.contact.streetAddress")}
                />

                <Field
                  id="addressStreet2"
                  name="address.street2"
                  label={t("application.contact.apt")}
                  defaultValue={member.householdMemberAddress.street2}
                  error={errors.address?.street2}
                  validation={{ maxLength: 64 }}
                  errorMessage={t("errors.maxLength")}
                  register={register}
                  dataTestId={"app-household-member-address-street2"}
                />

                <div className="flex max-w-2xl">
                  <Field
                    id="addressCity"
                    name="address.city"
                    label={t("application.contact.city")}
                    defaultValue={member.householdMemberAddress.city}
                    validation={{ required: true, maxLength: 64 }}
                    errorMessage={
                      errors.address?.city?.type === "maxLength"
                        ? t("errors.maxLength")
                        : t("errors.cityError")
                    }
                    error={errors.address?.city}
                    register={register}
                    dataTestId={"app-household-member-address-city"}
                  />

                  <Select
                    id="addressState"
                    name="address.state"
                    label={t("application.contact.state")}
                    defaultValue={member.householdMemberAddress.state}
                    validation={{ required: true, maxLength: 64 }}
                    error={errors.address?.state}
                    errorMessage={
                      errors.address?.state?.type === "maxLength"
                        ? t("errors.maxLength")
                        : t("errors.stateError")
                    }
                    register={register}
                    controlClassName="control"
                    options={stateKeys}
                    keyPrefix="states"
                    dataTestId={"app-household-member-address-state"}
                  />
                </div>

                <Field
                  id="addressZipCode"
                  name="address.zipCode"
                  label={t("application.contact.zip")}
                  defaultValue={member.householdMemberAddress.zipCode}
                  validation={{ required: true, maxLength: 64 }}
                  error={errors.address?.zipCode}
                  errorMessage={
                    errors.address?.zipCode?.type === "maxLength"
                      ? t("errors.maxLength")
                      : t("errors.zipCodeError")
                  }
                  register={register}
                  dataTestId={"app-household-member-address-zip"}
                />
              </fieldset>
            )}
          </CardSection>

          <CardSection divider={"inset"}>
            <fieldset>
              <legend className="text__caps-spaced">
                {t("application.household.member.workInRegion", {
                  county: listing?.listingsBuildingAddress?.county || listing?.jurisdictions?.name,
                })}
              </legend>
              <FieldGroup
                name="workInRegion"
                fieldGroupClassName="grid grid-cols-1"
                fieldClassName="ml-0"
                groupNote={t("application.household.member.workInRegionNote")}
                type="radio"
                register={register}
                validation={{ required: true }}
                error={errors.workInRegion}
                errorMessage={t("errors.selectOption")}
                fields={workInRegionOptions}
                dataTestId={"app-household-member-work-in-region"}
              />
            </fieldset>

            {(workInRegion == "yes" || (!workInRegion && member.workInRegion == "yes")) && (
              <fieldset className="mt-8">
                <legend className="text__caps-spaced">{t("application.contact.address")}</legend>

                <Field
                  id="workAddress.street"
                  name="workAddress.street"
                  label={t("application.contact.streetAddress")}
                  defaultValue={member.householdMemberWorkAddress.street}
                  validation={{ required: true, maxLength: 64 }}
                  error={errors.workAddress?.street}
                  errorMessage={
                    errors.workAddress?.street?.type === "maxLength"
                      ? t("errors.maxLength")
                      : t("errors.streetError")
                  }
                  register={register}
                  dataTestId={"app-household-member-work-address-street"}
                />

                <Field
                  id="workAddress.street2"
                  name="workAddress.street2"
                  label={t("application.contact.apt")}
                  defaultValue={member.householdMemberWorkAddress.street2}
                  error={errors.workAddress?.street2}
                  errorMessage={t("errors.maxLength")}
                  validation={{ maxLength: 64 }}
                  register={register}
                  dataTestId={"app-household-member-work-address-street2"}
                />

                <div className="flex max-w-2xl">
                  <Field
                    id="workAddress.city"
                    name="workAddress.city"
                    label={t("application.contact.city")}
                    defaultValue={member.householdMemberWorkAddress.city}
                    validation={{ required: true, maxLength: 64 }}
                    error={errors.workAddress?.city}
                    errorMessage={
                      errors.workAddress?.city?.type === "maxLength"
                        ? t("errors.maxLength")
                        : t("errors.cityError")
                    }
                    register={register}
                    dataTestId={"app-household-member-work-address-city"}
                  />

                  <Select
                    id="workAddress.state"
                    name="workAddress.state"
                    label={t("application.contact.state")}
                    defaultValue={member.householdMemberWorkAddress.state}
                    validation={{ required: true, maxLength: 64 }}
                    error={errors.workAddress?.state}
                    errorMessage={
                      errors.workAddress?.state?.type === "maxLength"
                        ? t("errors.maxLength")
                        : t("errors.stateError")
                    }
                    register={register}
                    controlClassName="control"
                    options={stateKeys}
                    keyPrefix="states"
                    dataTestId={"app-household-member-work-address-state"}
                  />
                </div>

                <Field
                  id="workAddress.zipCode"
                  name="workAddress.zipCode"
                  label={t("application.contact.zip")}
                  defaultValue={member.householdMemberWorkAddress.zipCode}
                  validation={{ required: true, maxLength: 64 }}
                  error={errors.workAddress?.zipCode}
                  errorMessage={
                    errors.workAddress?.zipCode?.type === "maxLength"
                      ? t("errors.maxLength")
                      : t("errors.zipCodeError")
                  }
                  register={register}
                  dataTestId={"app-household-member-work-address-zip"}
                />
              </fieldset>
            )}
          </CardSection>

          <CardSection divider={"inset"} className={"border-none"}>
            <div className={"field " + (errors.relationship ? "error" : "")}>
              <label className="text__caps-spaced" htmlFor="relationship">
                {t("application.household.member.whatIsTheirRelationship")}
              </label>
              <div className="control">
                <select
                  id="relationship"
                  name="relationship"
                  defaultValue={member.relationship}
                  ref={register({ required: true })}
                  className="w-full"
                  data-testid={"app-household-member-relationship"}
                >
                  <FormOptions
                    options={relationshipKeys}
                    keyPrefix="application.form.options.relationship"
                  />
                </select>
              </div>
              {errors.relationship && (
                <FormErrorMessage id="relationship-error" className={"pt-2"}>
                  {t("errors.selectOption")}
                </FormErrorMessage>
              )}
            </div>
          </CardSection>

          <CardSection divider={"flush"} className={"bg-primary-lighter border-none"}>
            <Button id={"app-household-member-save"} type={"submit"} variant={"primary"}>
              {saveText}
            </Button>
          </CardSection>
          <CardSection>
            <Button
              className="lined text-sm mt-0"
              type="button"
              onClick={deleteMember}
              variant={"text"}
              id={"app-household-member-cancel"}
            >
              {cancelText}
            </Button>
          </CardSection>
        </ApplicationFormLayout>
      </Form>
    </FormsLayout>
  )
}

export default ApplicationMember
