import React, { useState } from "react"
import "./Modal.scss"
import { Modal } from "./Modal"
import SVG from "react-inlinesvg"
import { Button } from "../actions/Button"
import { AppearanceBorderType, AppearanceStyleType } from "../global/AppearanceTypes"

export default {
  title: "Overlays/Modal",
  decorators: [
    (storyFn: any) => (
      <div style={{ padding: "1rem" }}>
        {storyFn()}
        <SVG src="/images/icons.svg" />
      </div>
    ),
  ],
}

const noop = () => {
  // intentionally blank
}

export const BasicModal = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(!openModal)
        }}
      >
        Open Modal
      </Button>
      <div style={{ height: "1000px" }}></div>
      <div>…</div>
      <Modal
        open={openModal}
        title="Modal Title"
        ariaDescription="Modal description"
        onClose={() => setOpenModal(!openModal)}
        actions={[
          <Button onClick={() => setOpenModal(!openModal)} type={AppearanceStyleType.primary}>
            Submit
          </Button>,
          <Button
            onClick={() => setOpenModal(!openModal)}
            type={AppearanceStyleType.secondary}
            border={AppearanceBorderType.borderless}
          >
            Cancel
          </Button>,
        ]}
      >
        Modal Content
      </Modal>
    </>
  )
}

export const TransparentOverlayModal = () => (
  <Modal
    open={true}
    title="Modal Title"
    ariaDescription="Modal description"
    onClose={noop}
    actions={[
      <Button onClick={noop} type={AppearanceStyleType.primary}>
        Submit
      </Button>,
      <Button
        onClick={noop}
        type={AppearanceStyleType.secondary}
        border={AppearanceBorderType.borderless}
      >
        Cancel
      </Button>,
    ]}
    backdrop={false}
  >
    Modal Content
  </Modal>
)

export const SuccessFailureModal = () => (
  <Modal
    open={true}
    title="Modal Title"
    ariaDescription="Modal description"
    onClose={noop}
    actions={[
      <Button onClick={noop} type={AppearanceStyleType.success}>
        Submit
      </Button>,
      <Button onClick={noop} type={AppearanceStyleType.alert}>
        Cancel
      </Button>,
    ]}
  >
    Modal Content
  </Modal>
)
