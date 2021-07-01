import * as React from "react"
import { t } from "../../../helpers/translator"
import { Listing } from "@bloom-housing/backend-core/types"

const WaitlistItem = (props: { className?: string; value: number; text: string }) => (
  <li className={`uppercase text-gray-800 text-tiny ${props.className}`}>
    <span className="text-right w-12 inline-block pr-2">{props.value}</span>
    <span>{props.text}</span>
  </li>
)

export interface WaitlistProps {
  listing: Listing
}

const Waitlist = (props: WaitlistProps) => {
  const listing = props.listing
  const showWaitlistValues =
    listing.showWaitlist &&
    listing.waitlistMaxSize &&
    listing.waitlistCurrentSize &&
    listing.waitlistOpenSpots
  let header, subheader, waitlistItems

  if (listing.unitsAvailable > 0 && listing.isWaitlistOpen) {
    header = t("listings.waitlist.unitsAndWaitlist")
    subheader = t("listings.waitlist.submitAnApplication")
    waitlistItems = (
      <>
        <WaitlistItem
          value={listing.unitsAvailable}
          text={t("listings.availableUnits")}
          className={"font-semibold"}
        />
        {showWaitlistValues && (
          <WaitlistItem
            value={listing.waitlistOpenSpots ?? 0}
            text={t("listings.waitlist.openSlots")}
            className={"font-semibold"}
          />
        )}
      </>
    )
  } else {
    if (listing.isWaitlistOpen) {
      header = t("listings.waitlist.isOpen")
      subheader = t("listings.waitlist.submitForWaitlist")
    } else {
      header = t("listings.waitlist.closed")
      subheader = null
    }
    waitlistItems = (
      <>
        <WaitlistItem
          value={listing.waitlistCurrentSize}
          text={t("listings.waitlist.currentSize")}
        />
        {listing.displayWaitlistSize && (
          <WaitlistItem
            value={listing.waitlistOpenSpots ?? 0}
            text={t("listings.waitlist.openSlots")}
            className={"font-semibold"}
          />
        )}
        <WaitlistItem value={listing.waitlistMaxSize} text={t("listings.waitlist.finalSize")} />
      </>
    )
  }

  return (
    <>
      <h4 className="text-caps-tiny">{header}</h4>
      <div>
        {subheader && <p className="text-tiny text-gray-800 pb-3">{subheader}</p>}
        {showWaitlistValues && <ul>{waitlistItems}</ul>}
      </div>
    </>
  )
}

export { Waitlist as default, Waitlist }
