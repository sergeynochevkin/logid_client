import { useContext } from 'react'
import { TranslateContext } from '..'

export const useColor = (value) => {
    const { Translate } = useContext(TranslateContext)
    let translatedValue = Translate.translation.find(el => el.service === value).color
    if (translatedValue === 'rgb(169, 169, 169)') {
        translatedValue = value
    }
    return translatedValue
}
