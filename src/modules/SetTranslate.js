export const SetTranslate = (language, value) => {
  

    if (value) {

        let translatedValue = Translate.translation.find(el => el.service === value)[language]

        if (translatedValue === '') {
            translatedValue = value
        }

        return translatedValue

    } else {
        return ''
    }

}
