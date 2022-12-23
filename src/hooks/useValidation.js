import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { TranslateContext } from '..'
import { SetNativeTranslate } from '../modules/SetNativeTranslate'

export const useValidation = (value, validations, fieldName) => {
  const { Translate } = useContext(TranslateContext)
  const [isEmpty, setIsEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [maxLengthError, setMaxLengthError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formatError, setFormatError] = useState(false)
  const [notValid, setNotValid] = useState(false)

  let to_short = SetNativeTranslate(Translate.language,{},'to_short')
  let to_long = SetNativeTranslate(Translate.language,{},'to_long')
  let not_empty = SetNativeTranslate(Translate.language,{},'not_empty')
  let format_error = SetNativeTranslate(Translate.language,{},'format_error')
  let symbols = SetNativeTranslate(Translate.language,{},'symbols')


  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setIsEmpty(false) : (setIsEmpty(true) || setErrorMessage(`${fieldName} ${not_empty}`))
          break;
        case 'minLength':
          value.length < validations[validation] && value.length > 0 ? (setMinLengthError(true) || setErrorMessage(`${fieldName} ${to_short} ${validations.minLength} ${symbols}`)) : setMinLengthError(false)
          break;
        case 'maxLength':
          value.length > validations[validation] && value.length > 0 ? (setMaxLengthError(true) || setErrorMessage(`${fieldName} ${to_long} ${validations.maxLength} ${symbols}`)) : setMaxLengthError(false)
          break;
        case 'validFormat':
          !validations[validation].test(String(value)) && value.length && value.length <= validations.maxLength && value.length >= validations.minLength ? (setFormatError(true) || setErrorMessage(`${fieldName} ${format_error}`)) : setFormatError(false)
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
