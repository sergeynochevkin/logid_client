import { useEffect, useState } from 'react'

export const useValidation = (value, validations, fieldName) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [maxLengthError, setMaxLengthError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formatError, setFormatError] = useState(false)
  const [notValid, setNotValid] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value  ? setIsEmpty(false) : (setIsEmpty(true) || setErrorMessage(`${fieldName} не может быть пустым`))
          break;
        case 'minLength':
          value.length < validations[validation] && value.length > 0 ? (setMinLengthError(true) || setErrorMessage(`${fieldName} не может короче ${validations.minLength} символов`)) : setMinLengthError(false)
          break;
        case 'maxLength':
          value.length > validations[validation] && value.length > 0 ? (setMaxLengthError(true) || setErrorMessage(`${fieldName} не может быть длиннее ${validations.maxLength} символов`)) : setMaxLengthError(false)
          break;
        case 'validFormat':
          !validations[validation].test(String(value)) && value.length && value.length <= validations.maxLength && value.length >= validations.minLength ? (setFormatError(true) || setErrorMessage(`${fieldName} неверного формата`)) : setFormatError(false)
          break;      
      }
    }
  }, [value])

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || formatError) {
      setNotValid(true)
    } else {
      setNotValid(false)
    }
  }, [isEmpty, minLengthError, maxLengthError, formatError])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    formatError,
    errorMessage,
    notValid,   
  }
}
