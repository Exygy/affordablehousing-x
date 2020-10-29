import React from "react"
import { AppStatusItem } from "./AppStatusItem"
import Archer from "@bloom-housing/listings-service/listings/archer.json"
import moment from "moment"
import { ApplicationDto } from "@bloom-housing/core"
const listing = Object.assign({}, Archer) as any

export default {
  title: "Blocks/Application Status Item",
}

const application = {} as ApplicationDto
let days = 10
listing.applicationDueDate = moment().add(days, "days").format()
application.listing = listing
application.updatedAt = new Date()

export const AppStatusItemPending = () => (
  <AppStatusItem
    status="inProgress"
    application={application}
    setDeletingApplication={() => {
      //
    }}
  ></AppStatusItem>
)

export const AppStatusItemSubmitted = () => (
  <AppStatusItem
    status="submitted"
    application={application}
    lotteryNumber="#98AU18"
    setDeletingApplication={() => {
      //
    }}
  ></AppStatusItem>
)

const application2 = {} as ApplicationDto
const listing2 = Object.assign({}, Archer) as any
application2.listing = listing2

export const AppStatusItemPastDue = () => (
  <AppStatusItem
    status="inProgress"
    application={application2}
    setDeletingApplication={() => {
      //
    }}
  ></AppStatusItem>
)
