import { useState } from 'react'
import { useValidation } from './useValidation'

export const useInput = (initialValue, validations, fieldName) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)

  const valid = useValidation(value, validations, fieldName)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    setValue,
    setDirty,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }

}

