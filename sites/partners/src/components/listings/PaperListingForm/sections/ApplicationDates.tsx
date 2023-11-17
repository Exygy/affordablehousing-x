import React, { useState, useMemo } from "react"
import { useWatch, useFormContext } from "react-hook-form"
import { YesNoAnswer } from "../../../../lib/helpers"
import { getDetailFieldDate, getDetailFieldTime } from "../../PaperListingDetails/sections/helpers"
import dayjs from "dayjs"

import {
  t,
  DateField,
  TimeField,
  Drawer,
  Button,
  LinkButton,
  AppearanceSizeType,
  MinimalTable,
  Modal,
  AppearanceStyleType,
} from "@bloom-housing/ui-components"
import { Grid } from "@bloom-housing/ui-seeds"
import { FormListing, TempEvent } from "../../../../lib/listings/formTypes"
import { OpenHouseForm } from "../OpenHouseForm"
import SectionWithGrid from "../../../shared/SectionWithGrid"

type ApplicationDatesProps = {
  openHouseEvents: TempEvent[]
  setOpenHouseEvents: (events: TempEvent[]) => void
  listing?: FormListing
}

const ApplicationDates = ({
  listing,
  openHouseEvents,
  setOpenHouseEvents,
}: ApplicationDatesProps) => {
  const openHouseHeaders = {
    date: "t.date",
    startTime: "t.startTime",
    endTime: "t.endTime",
    url: "t.link",
    action: "",
  }

  const openHouseTableData = useMemo(() => {
    return openHouseEvents.map((event) => {
      const { startTime, endTime, url } = event

      return {
        date: { content: startTime && getDetailFieldDate(startTime) },
        startTime: { content: startTime && getDetailFieldTime(startTime) },
        endTime: { content: endTime && getDetailFieldTime(endTime) },
        url: {
          content: url?.length ? (
            <LinkButton className="mx-0 my-0" href={url} unstyled>
              {t("t.url")}
            </LinkButton>
          ) : (
            t("t.n/a")
          ),
        },
        action: {
          content: (
            <div className="flex">
              <Button
                type="button"
                className="front-semibold uppercase my-0"
                onClick={() => setDrawerOpenHouse(event)}
                unstyled
              >
                {t("t.edit")}
              </Button>
              <Button
                type="button"
                className="font-semibold uppercase text-alert my-0"
                onClick={() => setModalDeleteOpenHouse(event)}
                unstyled
              >
                {t("t.delete")}
              </Button>
            </div>
          ),
        },
      }
    })
  }, [openHouseEvents])

  const formMethods = useFormContext()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, watch, control } = formMethods

  const enableDueDate = useWatch({
    control,
    name: "dueDateQuestion",
  })

  const [drawerOpenHouse, setDrawerOpenHouse] = useState<TempEvent | boolean>(false)
  const [modalDeleteOpenHouse, setModalDeleteOpenHouse] = useState<TempEvent | null>(null)

  const onOpenHouseEventsSubmit = (event: TempEvent) => {
    setDrawerOpenHouse(false)

    const eventsWithoutEdited = openHouseEvents.filter((item) => {
      return event.id ? event.id !== item.id : event.tempId !== item.tempId
    })

    setOpenHouseEvents(
      [...eventsWithoutEdited, event].sort((a, b) =>
        dayjs(a.startTime).isAfter(b.startTime) ? 1 : -1
      )
    )
  }

  const onOpenHouseEventDelete = (eventToDelete: TempEvent) => {
    const newEvents = openHouseEvents.filter((event) => event !== eventToDelete)
    setOpenHouseEvents(newEvents)
    setModalDeleteOpenHouse(null)
  }

  return (
    <>
      <hr className="spacer-section-above spacer-section" />
      <SectionWithGrid
        heading={t("listings.sections.applicationDatesTitle")}
        subheading={t("listings.sections.applicationDatesSubtitle")}
      >
        <Grid.Row columns={2}>
          <Grid.Cell>
            <DateField
              label={t("listings.applicationDeadline")}
              name={"applicationDueDateField"}
              id={"applicationDueDateField"}
              register={register}
              watch={watch}
              note={t("listings.whenApplicationsClose")}
              disabled={enableDueDate === YesNoAnswer.No}
              defaultDate={{
                month: listing?.applicationDueDate
                  ? dayjs(new Date(listing?.applicationDueDate)).format("MM")
                  : null,
                day: listing?.applicationDueDate
                  ? dayjs(new Date(listing?.applicationDueDate)).format("DD")
                  : null,
                year: listing?.applicationDueDate
                  ? dayjs(new Date(listing?.applicationDueDate)).format("YYYY")
                  : null,
              }}
            />
          </Grid.Cell>
          <Grid.Cell>
            <TimeField
              label={t("listings.applicationDueTime")}
              name={"applicationDueTimeField"}
              id={"applicationDueTimeField"}
              register={register}
              watch={watch}
              disabled={enableDueDate === YesNoAnswer.No}
              defaultValues={{
                hours: listing?.applicationDueDate
                  ? dayjs(new Date(listing?.applicationDueDate)).format("hh")
                  : enableDueDate === YesNoAnswer.No
                  ? null
                  : "05",
                minutes: listing?.applicationDueDate
                  ? dayjs(new Date(listing?.applicationDueDate)).format("mm")
                  : enableDueDate === YesNoAnswer.No
                  ? null
                  : "00",
                seconds: listing?.applicationDueDate
                  ? dayjs(new Date(listing?.applicationDueDate)).format("ss")
                  : enableDueDate === YesNoAnswer.No
                  ? null
                  : "00",
                period: listing?.applicationDueDate
                  ? new Date(listing?.applicationDueDate).getHours() >= 12
                    ? "pm"
                    : "am"
                  : "pm",
              }}
            />
          </Grid.Cell>
        </Grid.Row>
        <Grid.Row>
          <Grid.Cell className="grid-inset-section">
            {!!openHouseTableData.length && (
              <div className="mb-5">
                <MinimalTable headers={openHouseHeaders} data={openHouseTableData} />
              </div>
            )}

            <Button
              id="addOpenHouseButton"
              type="button"
              size={AppearanceSizeType.normal}
              onClick={() => setDrawerOpenHouse(true)}
            >
              {t("listings.sections.addOpenHouse")}
            </Button>
          </Grid.Cell>
        </Grid.Row>
      </SectionWithGrid>

      <Drawer
        open={!!drawerOpenHouse}
        title={t("listings.sections.addOpenHouse")}
        ariaDescription={t("listings.sections.addOpenHouse")}
        onClose={() => setDrawerOpenHouse(false)}
      >
        <OpenHouseForm
          onSubmit={onOpenHouseEventsSubmit}
          currentEvent={(drawerOpenHouse as TempEvent) || undefined}
        />
      </Drawer>

      <Modal
        open={!!modalDeleteOpenHouse}
        title={t("listings.events.deleteThisEvent")}
        ariaDescription={t("listings.events.deleteConf")}
        onClose={() => setModalDeleteOpenHouse(null)}
        actions={[
          <Button
            styleType={AppearanceStyleType.alert}
            onClick={() => onOpenHouseEventDelete(modalDeleteOpenHouse)}
            size={AppearanceSizeType.small}
          >
            {t("t.delete")}
          </Button>,
          <Button
            onClick={() => {
              setModalDeleteOpenHouse(null)
            }}
            size={AppearanceSizeType.small}
          >
            {t("t.cancel")}
          </Button>,
        ]}
      >
        {t("listings.events.deleteConf")}
      </Modal>
    </>
  )
}

export default ApplicationDates
