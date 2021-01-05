import React, { useContext, useMemo } from "react"
import { t, GridSection, MinimalTable, Button } from "@bloom-housing/ui-components"
import { DetailsApplicationContext } from "../DetailsApplicationContext"
import { MembersDrawer } from "../DetailsMemberDrawer"

type DetailsHouseholdMembersProps = {
  setMembersDrawer: (member: MembersDrawer) => void
}

const DetailsHouseholdMembers = ({ setMembersDrawer }: DetailsHouseholdMembersProps) => {
  const application = useContext(DetailsApplicationContext)

  const householdMembersHeaders = {
    name: t("t.name"),
    relationship: t("t.relationship"),
    birth: t("application.household.member.dateOfBirth"),
    sameResidence: t("application.add.sameResidence"),
    workInRegion: t("application.details.workInRegion"),
    action: "",
  }

  const householdMembersData = useMemo(() => {
    const checkAvailablility = (property) => {
      if (property === "yes") {
        return t("t.yes")
      } else if (property === "no") {
        return t("t.no")
      }

      return t("t.n/a")
    }
    return application?.householdMembers?.map((item) => ({
      name: `${item.firstName} ${item.middleName} ${item.lastName}`,
      relationship: item.relationship
        ? t(`application.form.options.relationship.${item.relationship}`)
        : t("t.n/a"),
      birth:
        item.birthMonth && item.birthDay && item.birthYear
          ? `${item.birthMonth}/${item.birthDay}/${item.birthYear}`
          : t("t.n/a"),
      sameResidence: checkAvailablility(item.sameAddress),
      workInRegion: checkAvailablility(item.workInRegion),
      action: (
        <Button
          type="button"
          className="font-semibold uppercase"
          onClick={() => setMembersDrawer(item)}
          unstyled
        >
          {t("t.view")}
        </Button>
      ),
    }))
  }, [application, setMembersDrawer])

  return (
    <GridSection
      className="bg-primary-lighter"
      title={t("application.household.householdMembers")}
      grid={false}
      tinted
      inset
    >
      {application.householdSize > 1 ? (
        <MinimalTable headers={householdMembersHeaders} data={householdMembersData} />
      ) : (
        <span className="text-base font-semibold	">{t("t.none")}</span>
      )}
    </GridSection>
  )
}

export { DetailsHouseholdMembers as default, DetailsHouseholdMembers }
