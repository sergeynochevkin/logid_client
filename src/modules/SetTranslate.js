import { useContext } from "react"
import { TranslateContext } from ".."


export const SetTranslate = (value) => {

    const { Translate } = useContext(TranslateContext)

    if (value) {
        let language = Translate.language
        let translatedValue = Translate.translation.find(el => el.service === value)[language]
        if (translatedValue === '') {
            translatedValue = value
        }
        return translatedValue

    } else {
        return ''
    }

}
