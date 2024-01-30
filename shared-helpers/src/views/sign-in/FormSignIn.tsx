import React, { useContext } from "react"
import { Field, Form, FormCard, Icon, NavigationContext, t } from "@bloom-housing/ui-components"
import { Button } from "@bloom-housing/ui-seeds"
import { FormSignInErrorBox } from "./FormSignInErrorBox"
import { NetworkStatus } from "../../auth/catchNetworkError"
import type { UseFormMethods } from "react-hook-form"
import { useRouter } from "next/router"

export type FormSignInProps = {
  control: FormSignInControl
  onSubmit: (data: FormSignInValues) => void
  networkStatus: NetworkStatus
  showRegisterBtn?: boolean
}

export type FormSignInControl = {
  errors: UseFormMethods["errors"]
  handleSubmit: UseFormMethods["handleSubmit"]
  register: UseFormMethods["register"]
  watch: UseFormMethods["watch"]
}

export type FormSignInValues = {
  email: string
  password: string
}

const FormSignIn = ({
  onSubmit,
  networkStatus,
  showRegisterBtn,
  control: { errors, register, handleSubmit },
}: FormSignInProps) => {
  const onError = () => {
    window.scrollTo(0, 0)
  }
  const { LinkComponent } = useContext(NavigationContext)
  const router = useRouter()
  const listingIdRedirect = router.query?.listingId as string
  const forgetPasswordURL =
    process.env.showMandatedAccounts && listingIdRedirect
      ? `/forgot-password?redirectUrl=/applications/start/choose-language&listingId=${listingIdRedirect}`
      : "/forgot-password"
  const createAccountUrl =
    process.env.showMandatedAccounts && listingIdRedirect
      ? `/create-account?redirectUrl=/applications/start/choose-language&listingId=${listingIdRedirect}`
      : "/create-account"
  return (
    <FormCard>
      <div className="form-card__lead text-center">
        <Icon size="2xl" symbol="profile" />
        <h1 className="form-card__title">{t(`nav.signIn`)}</h1>
      </div>
      <FormSignInErrorBox
        errors={errors}
        networkStatus={networkStatus}
        errorMessageId={"main-sign-in"}
      />
      <div className="form-card__group pt-0">
        <Form id="sign-in" className="mt-10" onSubmit={handleSubmit(onSubmit, onError)}>
          <Field
            caps={true}
            name="email"
            label={t("t.email")}
            validation={{ required: true }}
            error={errors.email}
            errorMessage={t("authentication.signIn.enterLoginEmail")}
            register={register}
            dataTestId="sign-in-email-field"
          />

          <aside className="float-right text-sm font-semibold">
            <LinkComponent href={forgetPasswordURL}>
              {t("authentication.signIn.forgotPassword")}
            </LinkComponent>
          </aside>

          <Field
            caps={true}
            name="password"
            label={t("authentication.createAccount.password")}
            validation={{ required: true }}
            error={errors.password}
            errorMessage={t("authentication.signIn.enterLoginPassword")}
            register={register}
            type="password"
            dataTestId="sign-in-password-field"
          />

          <div className="text-center mt-6">
            <Button type="submit" variant="primary" id="sign-in-button">
              {t("nav.signIn")}
            </Button>
          </div>
        </Form>
      </div>
      {showRegisterBtn && (
        <div className="form-card__group text-center border-t">
          <h2 className="mb-6">{t("authentication.createAccount.noAccount")}</h2>

          <Button variant="primary-outlined" href={createAccountUrl}>
            {t("account.createAccount")}
          </Button>
        </div>
      )}
    </FormCard>
  )
}

export { FormSignIn as default, FormSignIn }
