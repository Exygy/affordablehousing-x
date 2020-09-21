import React from "react"
import Link from "next/link"
import { SimpleTable } from "./SimpleTable"
import { ViewItem } from "./ViewItem"
import { ViewSection } from "./ViewSection"

export default {
  title: "Prototypes/ViewSection",
  decorators: [(storyFn: any) => <div style={{ padding: "1rem" }}>{storyFn()}</div>],
}

export const FourColumns = () => (
  <ViewSection
    title="Section Title"
    tinted={true}
    className="md:grid md:grid-cols-4 md:gap-8"
  >
    <ViewItem
        label="First Name"
        children="Lisa"
      />

      <ViewItem
        label="Middle Name"
        children="S"
      />

      <ViewItem
        label="Last Name"
        children="Jones"
      />

      <ViewItem
        label="Date of Birth"
        children="01/01/1985"
      />

      <ViewItem
        label="Email"
        children="lisa@gmail.com"
      />

      <ViewItem
        label="Phone"
        children="111-222-3333"
        helper="Cell"
      />

      <ViewItem
        label="Second Phone"
        children="111-222-3333"
        helper="Work"
      />

      <ViewItem
        label="Perferred Contact"
        children="Phone"
      />
  </ViewSection>
)

export const FourColumnsEdit = () => (
  <ViewSection
    title="Section Title"
    edit="Edit"
    tinted={true}
    className="md:grid md:grid-cols-4 md:gap-8"
  >
    <ViewItem
      label="First Name"
      children="Lisa"
    />

    <ViewItem
      label="Middle Name"
      children="S"
    />

    <ViewItem
      label="Last Name"
      children="Jones"
    />

    <ViewItem
      label="Date of Birth"
      children="01/01/1985"
    />

    <ViewItem
      label="Email"
      children="lisa@gmail.com"
    />

    <ViewItem
      label="Phone"
      children="111-222-3333"
      helper="Cell"
    />

    <ViewItem
      label="Second Phone"
      children="111-222-3333"
      helper="Work"
    />

    <ViewItem
      label="Perferred Contact"
      children="Phone"
    />
  </ViewSection>
)

export const Address = () => (
  <div className="view-section">
    <header className="view-header">
      <h2 className="view-title">My Section</h2>
    </header>  
    <div className="view-grid md:grid md:grid-cols-1 gap-y-4 bg-primary-lighter">
      <div className="view-group">
        <h3 className="view-group__title">Residence Address</h3>
        <div className="view-subgrid md:grid md:grid-cols-4 md:gap-8">
          <ViewItem
            label="Street Address"
            children="112 Springfield St."
            className="md:col-span-3"
          />

          <ViewItem
            label="Apt Unit #"
            children="1"
          />

          <ViewItem
            label="City"
            children="Oakland"
            className="md:col-span-2"
          />

          <ViewItem
            label="State"
            children="CA"
          />

          <ViewItem
            label="Zip"
            children="94577"
          />
        </div>
      </div>
    </div>
  </div>
)

export const ViewSectionSingleColumn = () => (
  <div className="view-section">
    <h3 className="view-group__title">My Group</h3>

    <div className="view-grid md:grid md:grid-cols-1 gap-y-4 bg-primary-lighter">
      <ViewItem
        label="First Name"
        children="Lisa"
      />

      <ViewItem
        label="Middle Name"
        children="S"
      />

      <ViewItem
        label="Last Name"
        children="Jones"
      />

      <ViewItem
        label="Date of Birth"
        children="01/01/1985"
      />

      <ViewItem
        label="Email"
        children="lisa@gmail.com"
      />

      <ViewItem
        label="Phone"
        children="111-222-3333"
        helper="Cell"
      />

      <ViewItem
        label="Second Phone"
        children="111-222-3333"
        helper="Work"
      />

      <ViewItem
        label="Perferred Contact"
        children="Phone"
      />
    </div>
  </div>
)

export const ViewSectionSingleColumnWarn = () => (
  <div className="view-section">
    <p className="view-item">
      <span className="view-item__label">Application Number</span>
      <span className="view-item__value">APP-0001002002</span>
    </p>
    <div className="bg-primary-lighter my-4 p-4">
      <fieldset>
        <legend className="field-note mb-4 text-gray-750">Confirm this application is valid:</legend>
        <div className="field-group--inline">
          <div className="field "><input type="radio" id="testvalidappkeep" name="testvalidapp" value="keep" /><label className="font-semibold" htmlFor="testvalidappkeep">Keep</label></div>
          <div className="field "><input type="radio" id="testvalidappremove" name="testvalidapp" value="remove" /><label className="font-semibold" htmlFor="testvalidappremove">Remove</label></div>
        </div>
      </fieldset>
    </div>

    <h3 className="view-group__title">My Group</h3>

    <div className="view-grid md:grid md:grid-cols-1 gap-y-4 bg-primary-lighter">
      <ViewItem
        label="First Name"
        children="Lisa"
        flagged={true}
      />

      <ViewItem
        label="Middle Name"
        children="S"
        flagged={true}
      />

      <ViewItem
        label="Last Name"
        children="Jones"
        flagged={true}
      />

      <ViewItem
        label="Date of Birth"
        children="01/01/1985"
        flagged={true}
      />

      <ViewItem
        label="Email"
        children="lisa@gmail.com"
      />

      <ViewItem
        label="Phone"
        children="111-222-3333"
        helper="Cell"
      />

      <ViewItem
        label="Second Phone"
        children="111-222-3333"
        helper="Work"
      />

      <ViewItem
        label="Perferred Contact"
        children="Phone"
      />
    </div>
  </div>
)


export const ViewSectionTable = () => (
  <div className="view-section">
    <header className="view-header">
      <h2 className="view-title">My Section</h2>
    </header>

    <div className="view-grid bg-primary-lighter">
      <SimpleTable />
    </div> 
  </div>
)