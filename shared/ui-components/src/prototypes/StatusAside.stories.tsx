import React from "react"
import { Tag } from "./Tag"
import { Button } from "../actions/Button"

import "./StatusAside.scss"

export default {
  title: "Prototypes/StatusAside",
  decorators: [(storyFn: any) => <div style={{ padding: "1rem" }}>{storyFn()}</div>],
}

const handleClick = (e: React.MouseEvent) => {
  alert(`You clicked me! Event: ${e.type}`)
}

export const StatusAside = () => (
  <div className="status-aside">
    <div className="status-aside__buttons mb-4 pb-6 border-b">
      <div className="button-group grid grid-cols-2 gap-2">
          <div className="button-group__item">
          <Button small={true} onClick={handleClick}>
            Save
          </Button>
          </div>
          <div className="button-group__item">
          <Button small={true} className="is-secondary" onClick={handleClick}>
            Preview
          </Button>
          </div>
          <div className="button-group__item col-span-2">
          <Button small={true} filled={true} onClick={handleClick}>
            Submit
          </Button>
          </div>
      </div>
    </div>

    <div className="status-aside__messages">
      <h3 className="font-alt-sans text-lg pt-2">Status History</h3>
      <ul className="status-messages">
        <li className="status-message border-b">
          <div className="status-message__status">
            <Tag pillStyle={true} success={true} small={true}>
            Submitted
            </Tag>

            <span className="status-message__time">
             01/01/21
            </span>
          </div>

          <div className="status-message__note">Changed status of one application.</div>
        </li>
        <li className="status-message border-b">
          <div className="status-message__status">
            <Tag pillStyle={true} small={true}>
            Draft
            </Tag>

            <span className="status-message__time">
             01/01/21
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
)

export const StatusAsideLast = () => (
  <div className="status-aside">
    <div className="status-aside__buttons mb-4 pb-6 border-b">
      <div className="button-group flex flex-col">
        <Button small={true} className="is-secondary" onClick={handleClick}>
          Edit
        </Button>
      </div>
    </div>

    <div className="status-aside__messages">
      <ul className="status-messages">
        <li className="status-message">
          <div className="status-message__note text-center">Last Updated: August 1, 2020</div>
        </li>
      </ul>
    </div>
  </div>
)

export const StatusAsideMinimumal = () => (
  <div className="status-aside">
    <ul className="status-messages">
      <li className="status-message flex">
        <div className="status-message__note text-center">Last Updated: August 1, 2020</div>
      </li>
    </ul>
  </div>
)
