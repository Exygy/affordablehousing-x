import * as React from "react"
import Address from "./SidebarAddress"
import t from "../../../helpers/translator"
import { Listing } from "@bloom/interfaces/src/listings"

interface LeasingAgentProps {
  listing: Listing
}

const LeasingAgent = (props: LeasingAgentProps) => {
  const listing = props.listing

  const phoneNumber = `tel:${listing.leasing_agent_phone.replace(/[-()]/g, "")}`
  const leasingAgentAddress = {
    streetAddress: listing.leasing_agent_street,
    city: listing.leasing_agent_city,
    state: listing.leasing_agent_state,
    zipCode: listing.leasing_agent_zip
  }

  return (
    <>
      <h4 className="text-caps-underline">Contact Leasing Agent</h4>

      <p className="text-xl">{listing.leasing_agent_name}</p>
      <p className="text-gray-700">{listing.leasing_agent_title}</p>

      <p className="mt-5">
        <a href={phoneNumber}>Call {listing.leasing_agent_phone}</a>
      </p>
      <p className="text-sm text-gray-700">{t("leasing_agent.due_to_high_call_volume")}</p>

      <p className="my-5">
        <a href={`mailto:${listing.leasing_agent_email}`}>Email</a>
      </p>

      <Address address={leasingAgentAddress} officeHours={listing.leasing_agent_office_hours} />
    </>
  )
}

export default LeasingAgent
