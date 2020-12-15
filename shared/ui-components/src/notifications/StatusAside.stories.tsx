import React from "react"
import { StatusAside } from "./StatusAside"
import { GridCell } from "../sections/GridSection"
import { Button } from "../actions/Button"
import { AppearanceSizeType, AppearanceStyleType } from "../global/AppearanceTypes"
import { StatusMessages, StatusMessage } from "./StatusMessage"

export default {
  title: "Notifications/Status Aside",
  decorators: [(storyFn: any) => <div style={{ padding: "1rem" }}>{storyFn()}</div>],
}

export const WithButtonsAndMessages = () => (
  <StatusAside
    actions={[
      <GridCell>
        <Button fullWidth={true} size={AppearanceSizeType.small} onClick={() => {}}>
          Save
        </Button>
      </GridCell>,
      <GridCell>
        <Button
          type={AppearanceStyleType.secondary}
          fullWidth={true}
          size={AppearanceSizeType.small}
          onClick={() => {}}
        >
          Preview
        </Button>
      </GridCell>,
      <GridCell span={2}>
        <Button
          type={AppearanceStyleType.primary}
          fullWidth={true}
          size={AppearanceSizeType.small}
          onClick={() => {}}
        >
          Submit
        </Button>
      </GridCell>,
    ]}
  >
    <StatusMessages>
      <StatusMessage
        status="Submitted"
        style={AppearanceStyleType.success}
        timestamp="3/2/21"
        body="Changed status of one application."
      />
      <StatusMessage status="Draft" timestamp="2/1/21" />
    </StatusMessages>
  </StatusAside>
)
