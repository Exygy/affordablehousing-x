import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import { t } from "@bloom-housing/ui-components"
import { AuthContext, BloomCard, CustomIconMap, RequireLogin } from "@bloom-housing/shared-helpers"
import { Application, Listing } from "@bloom-housing/shared-helpers/src/types/backend-swagger"
import { Card, Button, Heading, Icon, Message } from "@bloom-housing/ui-seeds"
import FormsLayout from "../../../../layouts/forms"
import {
  ApplicationError,
  ApplicationListingCard,
} from "../../../../components/account/ApplicationCards"
import styles from "../../../../../styles/lottery-results.module.scss"

export default () => {
  const router = useRouter()
  const applicationId = router.query.id as string
  const { applicationsService, listingsService, profile } = useContext(AuthContext)
  const [application, setApplication] = useState<Application>()
  const [listing, setListing] = useState<Listing>()
  const [unauthorized, setUnauthorized] = useState(false)
  const [noApplication, setNoApplication] = useState(false)
  useEffect(() => {
    if (profile) {
      applicationsService
        .retrieve({ applicationId })
        .then((app) => {
          setApplication(app)
          listingsService
            ?.retrieve({ id: app.listings.id })
            .then((retrievedListing) => {
              setListing(retrievedListing)
            })
            .catch((err) => {
              console.error(`Error fetching listing: ${err}`)
            })
        })
        .catch((err) => {
          console.error(`Error fetching application: ${err}`)
          const { status } = err.response || {}
          if (status === 404) {
            setNoApplication(true)
          }
          if (status === 403) {
            setUnauthorized(true)
          }
        })
    }
  }, [profile, applicationId, applicationsService, listingsService])

  return (
    <>
      <RequireLogin signInPath="/sign-in" signInMessage={t("t.loginIsRequired")}>
        <FormsLayout className={styles["lottery-results"]}>
          {noApplication && (
            <ApplicationError error={t("account.application.noApplicationError")} />
          )}
          {unauthorized && <ApplicationError error={t("account.application.noAccessError")} />}
          {application && (
            <>
              <ApplicationListingCard listingName={listing?.name} listingId={listing?.id} />
              <BloomCard className={"mb-6"}>
                <>
                  <Card.Section divider={"inset"} className={"border-none"}>
                    <Button
                      size="sm"
                      leadIcon={<Icon>{CustomIconMap.chevronLeft}</Icon>}
                      variant={"text"}
                      href={"/account/applications"}
                    >
                      {t("t.back")}
                    </Button>
                    <Heading priority={2} size={"2xl"} className="mt-6">
                      {t("account.application.lottery.resultsHeader")}
                    </Heading>
                    <p className="mt-4">
                      {t("account.application.lottery.resultsSubheader", {
                        applications: 2500,
                        units: 50,
                      })}
                    </p>
                  </Card.Section>
                  <Card.Section
                    divider={"flush"}
                    className={`${styles["background-card-section"]} border-none`}
                  >
                    <Heading priority={3} size={"xl"}>
                      {t("account.application.lottery.rawRankHeader")}
                    </Heading>
                    <p className={styles["raw-rank"]}>57</p>
                  </Card.Section>
                  <Card.Section divider={"flush"}>
                    <div>
                      <p>{t("account.application.lottery.rawRank")}</p>
                    </div>
                    <div>
                      <Button
                        className={styles["section-button"]}
                        href={"https://www.exygy.com"}
                        hideExternalLinkIcon={true}
                        size={"sm"}
                      >
                        {t("account.application.lottery.rawRankButton")}
                      </Button>
                    </div>
                  </Card.Section>
                  <Card.Section divider={"flush"} className={"border-none"}>
                    <div>
                      <Heading priority={3} size={"xl"} className={`${styles["section-heading"]}`}>
                        {t("account.application.lottery.preferencesHeader")}
                      </Heading>
                      <p>{t("account.application.lottery.preferences")}</p>
                    </div>
                    <div>
                      <Button
                        className={styles["section-button"]}
                        href={"https://www.exygy.com"}
                        hideExternalLinkIcon={true}
                        size={"sm"}
                      >
                        {t("account.application.lottery.preferencesButton")}
                      </Button>
                    </div>
                  </Card.Section>
                  <Card.Section
                    divider={"flush"}
                    className={`${styles["background-card-alert-section"]}`}
                  >
                    <Message fullwidth={true}>
                      {t("account.application.lottery.preferencesMessage")}
                    </Message>
                  </Card.Section>
                  <Card.Section divider={"flush"} className={styles["preference-rank"]}>
                    <div className={styles["rank-number"]}>#10</div>
                    <div>
                      <Heading priority={4} size={"lg"}>{`Certificate of Preference`}</Heading>
                      <p className={styles["number-applicants"]}>
                        {t("account.application.lottery.applicantList", { applicants: 10 })}
                      </p>
                    </div>
                  </Card.Section>
                  <Card.Section divider={"flush"} className={styles["preference-rank"]}>
                    <div className={styles["rank-number"]}>#15</div>
                    <div>
                      <Heading
                        priority={4}
                        size={"lg"}
                      >{`Displaced Tenants Housing Preference`}</Heading>
                      <p className={styles["number-applicants"]}>
                        {t("account.application.lottery.applicantList", { applicants: 15 })}
                      </p>
                    </div>
                  </Card.Section>
                  <Card.Section divider={"flush"} className={styles["preference-rank"]}>
                    <div className={styles["rank-number"]}>
                      <span className={styles["rank-number-content"]}>#1008</span>
                    </div>
                    <div>
                      <Heading priority={4} size={"lg"}>{`Live/Work Preference`}</Heading>
                      <p className={styles["number-applicants"]}>
                        {t("account.application.lottery.applicantList", { applicants: 2800 })}
                      </p>
                    </div>
                  </Card.Section>
                  <Card.Section divider={"flush"} className={"border-none"}>
                    <div>
                      <Heading priority={3} size={"xl"} className={`${styles["section-heading"]}`}>
                        {t("account.application.lottery.nextHeader")}
                      </Heading>
                      <p>{t("account.application.lottery.next")}</p>
                    </div>
                  </Card.Section>
                </>
              </BloomCard>
            </>
          )}
        </FormsLayout>
      </RequireLogin>
    </>
  )
}
