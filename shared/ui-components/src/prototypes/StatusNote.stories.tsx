import React from "react"

import "./StatusNote.scss"

export default {
  title: "Prototypes/StatusNote",
  decorators: [(storyFn: any) => <div style={{ padding: "1rem" }}>{storyFn()}</div>],
}

export const StatusNote = () => (
  <div className="status-note">
    <p><span className="font-semibold mr-1">You reviewed 07/15/2020 at 12:00pm.</span><span>Changed status of one application.</span></p>
  </div>
)
