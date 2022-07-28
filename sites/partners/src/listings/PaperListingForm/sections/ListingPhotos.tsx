import React, { useCallback, useEffect, useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import {
  t,
  AppearanceStyleType,
  Button,
  Dropzone,
  Drawer,
  GridSection,
  GridCell,
  MinimalTable,
  TableThumbnail,
  StandardTableData,
  StandardTableCell,
} from "@bloom-housing/ui-components"
import { getUrlForListingImage, CLOUDINARY_BUILDING_LABEL } from "@bloom-housing/shared-helpers"

import { cloudinaryFileUploader, fieldHasError } from "../../../../lib/helpers"
import { ListingImage, Asset } from "@bloom-housing/backend-core"

const ListingPhotos = () => {
  const formMethods = useFormContext()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, watch, errors, clearErrors } = formMethods

  const { fields, append, remove } = useFieldArray({
    name: "images",
  })

  const listingFormPhotos: ListingImage[] = watch("images").sort(
    (imageA, imageB) => imageA.ordinal - imageB.ordinal
  )

  /*
    Set state for the drawer, upload progress, and more
  */
  const [drawerState, setDrawerState] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [latestUpload, setLatestUpload] = useState({
    id: "",
    url: "",
  })

  const resetDrawerState = () => {
    setDrawerState(false)
  }

  const savePhoto = useCallback(() => {
    append({
      ordinal: listingFormPhotos.length,
      image: { fileId: latestUpload.id, label: CLOUDINARY_BUILDING_LABEL },
    })
    setLatestUpload({ id: "", url: "" })
    setProgressValue(0)
  }, [append, listingFormPhotos, latestUpload])

  useEffect(() => {
    if (latestUpload.id != "") {
      savePhoto()
    }
  }, [latestUpload, savePhoto])

  /*
    Set up table headers
  */
  const photoTableHeaders = {
    preview: "t.preview",
    fileName: "t.fileName",
    primary: "t.primary",
    actions: "",
  }

  const drawerTableHeaders = {
    ordinal: "t.order",
    ...photoTableHeaders,
  }

  /*
    Show a re-orderable list of uploaded images within the drawer
  */
  const drawerTableRows: StandardTableData = listingFormPhotos.map((item, index) => {
    const image = item.image as Asset
    return {
      ordinal: {
        content: item.ordinal + 1,
      },
      preview: {
        content: (
          <TableThumbnail>
            <img src={getUrlForListingImage(image)} />
          </TableThumbnail>
        ),
      },
      fileName: { content: image.fileId.split("/").slice(-1).join() },
      primary: {
        content: index == 0 ? t("listings.sections.primaryPhoto") : "",
      },
      actions: {
        content: (
          <Button
            type="button"
            className="font-semibold uppercase text-red-700"
            onClick={() => {
              remove(index)
            }}
            unstyled
          >
            {t("t.delete")}
          </Button>
        ),
      },
    }
  })

  /*
    Show list of images in the main listing form
  */
  const listingPhotoTableRows: StandardTableData = []
  listingFormPhotos.forEach((image, index) => {
    listingPhotoTableRows.push({
      preview: {
        content: (
          <TableThumbnail>
            <img src={getUrlForListingImage(image.image as Asset)} />
          </TableThumbnail>
        ),
      },
      fileName: { content: image.image.fileId.split("/").slice(-1).join() },
      primary: {
        content: index == 0 ? "Primary photo" : "",
      },
      actions: {
        content: (
          <Button
            type="button"
            className="font-semibold uppercase text-red-700"
            onClick={() => {
              remove(index)
            }}
            unstyled
          >
            {t("t.delete")}
          </Button>
        ),
      },
    })
  })

  /*
    Pass the file for the dropzone callback along to the uploader
  */
  const photoUploader = async (file: File) => {
    void (await cloudinaryFileUploader({
      file,
      setCloudinaryData: setLatestUpload,
      setProgressValue,
    }))
  }

  /*
    Register the field array, display the main form table, and set up the drawer
  */
  return (
    <>
      {fields.map((item, index) => (
        <span key={item.id}>
          <input
            type="hidden"
            name={`images[${index}].image.fileId`}
            ref={register()}
            defaultValue={item.image.fileId}
          />
        </span>
      ))}
      <GridSection
        grid={false}
        separator
        title={t("listings.sections.photoTitle")}
        description={t("listings.sections.photoSubtitle")}
      >
        {
          <span className={"text-tiny text-gray-800 block mb-2"}>
            {t("listings.sections.photoTitle")}
          </span>
        }
        <GridSection columns={1} tinted inset>
          <GridCell>
            {listingFormPhotos.length > 0 && (
              <div className="mb-5">
                <MinimalTable
                  headers={photoTableHeaders}
                  data={listingPhotoTableRows}
                ></MinimalTable>
              </div>
            )}

            <Button
              type="button"
              styleType={fieldHasError(errors?.images) ? AppearanceStyleType.alert : null}
              onClick={() => {
                setDrawerState(true)
                clearErrors("images")
              }}
            >
              {t(listingFormPhotos.length > 0 ? "listings.editPhotos" : "listings.addPhoto")}
            </Button>
          </GridCell>
        </GridSection>
      </GridSection>
      {fieldHasError(errors?.images) && (
        <span className={"text-sm text-alert"}>{errors?.images?.nested?.message}</span>
      )}

      <Drawer
        open={drawerState}
        title={t(listingFormPhotos.length > 0 ? "listings.editPhotos" : "listings.addPhoto")}
        onClose={() => resetDrawerState()}
        ariaDescription="Form with photo upload dropzone"
        actions={[
          <Button
            key={0}
            onClick={() => {
              resetDrawerState()
            }}
            styleType={AppearanceStyleType.primary}
            data-test-id={!latestUpload.url ? "listing-photo-empty" : "listing-photo-uploaded"}
          >
            Save
          </Button>,
        ]}
      >
        <section className="border rounded-md p-8 bg-white">
          {listingFormPhotos.length > 0 && (
            <div className="mb-10">
              <MinimalTable
                draggable={true}
                setData={(newData) => {
                  const updatedFields = newData.map((item: Record<string, StandardTableCell>) => {
                    return fields.find(
                      (field) =>
                        field.image.fileId.split("/").slice(-1).join() == item.fileName.content
                    )
                  })
                  remove(fields.map((item, index) => index))
                  updatedFields.forEach((item, index) => {
                    append({
                      ordinal: index,
                      image: item.image,
                    })
                  })
                }}
                headers={drawerTableHeaders}
                data={drawerTableRows}
              ></MinimalTable>
            </div>
          )}
          <Dropzone
            id="listing-photo-upload"
            label={t("t.uploadFile")}
            helptext={t("listings.sections.photoHelperText")}
            uploader={photoUploader}
            accept="image/*"
            progress={progressValue}
          />
        </section>
      </Drawer>
    </>
  )
}

export default ListingPhotos
