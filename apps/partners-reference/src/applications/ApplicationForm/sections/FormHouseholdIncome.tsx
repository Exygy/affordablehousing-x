import React from "react"
import { t, GridSection, ViewItem, GridCell, Field, Select } from "@bloom-housing/ui-components"
import { useFormContext } from "react-hook-form"

const FormHouseholdIncome = () => {
  const formMethods = useFormContext()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, setValue, watch } = formMethods

  const incomePeriodValue: string = watch("application.incomePeriod")

  return (
    <GridSection title={t("application.details.householdIncome")} grid={false} separator>
      <GridSection columns={3}>
        <GridCell>
          <ViewItem label={t("application.add.incomePeriod")}>
            <div className="flex h-12 items-center">
              <Field
                id="application.incomePeriodYear"
                name="application.incomePeriod"
                className="m-0"
                type="radio"
                label={t("t.perYear")}
                register={register}
                inputProps={{
                  value: "perYear",
                  onChange: () => {
                    setValue("incomeMonth", "")
                    setValue("incomeYear", "")
                  },
                }}
              />

              <Field
                id="application.incomePeriodMonth"
                name="application.incomePeriod"
                className="m-0"
                type="radio"
                label={t("t.perMonth")}
                register={register}
                inputProps={{
                  value: "perMonth",
                  onChange: () => {
                    setValue("incomeMonth", "")
                    setValue("incomeYear", "")
                  },
                }}
              />
            </div>
          </ViewItem>
        </GridCell>
      </GridSection>

      <GridSection columns={3}>
        <GridCell>
          <ViewItem label={t("application.details.annualIncome")}>
            <Field
              id="incomeYear"
              type="number"
              name="incomeYear"
              label={t("application.details.annualIncome")}
              placeholder={t("t.enterAmount")}
              register={register}
              disabled={incomePeriodValue !== "perYear"}
              readerOnly
            />
          </ViewItem>
        </GridCell>

        <GridCell>
          <ViewItem label={t("application.details.monthlyIncome")}>
            <Field
              id="incomeMonth"
              type="number"
              name="incomeMonth"
              label={t("application.details.monthlyIncome")}
              placeholder={t("t.enterAmount")}
              register={register}
              disabled={incomePeriodValue !== "perMonth"}
              readerOnly
            />
          </ViewItem>
        </GridCell>

        <GridCell>
          <ViewItem label={t("application.details.vouchers")}>
            <Select
              id="application.incomeVouchers"
              name="application.incomeVouchers"
              placeholder={t("t.selectOne")}
              label={t("application.details.vouchers")}
              labelClassName="sr-only"
              register={register}
              controlClassName="control"
              options={["yes", "no"]}
              keyPrefix="t"
            />
          </ViewItem>
        </GridCell>
      </GridSection>
    </GridSection>
  )
}

export { FormHouseholdIncome as default, FormHouseholdIncome }
