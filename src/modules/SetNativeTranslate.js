export const SetNativeTranslate = (language,phrase_object) => {

    let translatedText = phrase_object[language]
    if (translatedText) {
        translatedText = translatedText.join(' ')
    }

    return translatedText
}
