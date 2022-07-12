import React, { useRef, useEffect, useMemo } from "react"
import AriaAutocomplete, { IAriaAutocompleteOptions } from "aria-autocomplete"
import { UseFormMethods, RegisterOptions } from "react-hook-form"
import "./MultiSelectField.scss"
import { Icon } from "../icons/Icon"

interface MultiSelectFieldProps {
  name: string
  dataSource: string | string[] | any[] | Function | Promise<any[]>
  register: UseFormMethods["register"]
  getValues: UseFormMethods["getValues"]
  setValue: UseFormMethods["setValue"]
  placeholder?: string
  validation?: RegisterOptions
  label?: string
  id?: string
  dataTestId?: string
}

const MultiSelectField = (props: MultiSelectFieldProps) => {
  const autocompleteRef = useRef<HTMLInputElement>(null)

  const { name, register, setValue } = props
  register({ name }, props.validation)

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.value = props.getValues(name)
      AriaAutocomplete(autocompleteRef.current, {
        source: props.dataSource,
        delay: 500, // debounce for a half-second
        inputClassName: "input",
        multiple: true,
        placeholder: props.placeholder,
        deleteOnBackspace: true,
        showAllControl: true,
        cssNameSpace: "multi-select-field",
        onChange: (selected) => {
          setValue(
            name,
            selected.map((item) => item.value)
          )
        },
      })
    }
  }, [autocompleteRef, name, setValue, props.dataSource])

  const label = useMemo(() => {
    const labelClasses = ["label"]

    return (
      <label className={labelClasses.join(" ")} htmlFor={props.id}>
        {props.label}
      </label>
    )
  }, [props.id, props.label])

  return (
    <div className="field multi-select-field">
      {props.label && label}
      <div className="control" data-test-id={props.dataTestId}>
        <Icon symbol="search" size="medium" />
        <input id={props.id} ref={autocompleteRef} />
      </div>
    </div>
  )
}

export { MultiSelectField as default, MultiSelectField }
