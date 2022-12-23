export const setColor = (value) => {

    let color = [
        { service: 'arc_bookmark', color: 'rgb(210,219,236, 0.8)' },
        { service: 'new_bookmark', color: 'rgb(129, 199, 132,0.8)' },
        { service: 'postponed_bookmark', color: 'rgb(241,196,15,0.8)' },
        { service: 'canceled_bookmark', color: 'rgb(254, 111, 103,0.8)' },
        { service: 'completed_bookmark', color: 'rgb(214,232,255,0.8)' },
        { service: 'inWork_bookmark', color: 'rgb(254, 145, 40,0.8)' },
        { service: 'templates_bookmark', color: 'rgb(254, 145, 40,0.8)' },
        { service: 'normal', color: 'rgb(241,196,15,0.8)' },
        { service: 'priority', color: 'rgb(129, 199, 132,0.8)' },
        { service: 'blocked', color: 'rgb(254, 111, 103,0.8)' },
        { service: 'arc', color: 'rgb(210,219,236, 0.8)' },
        { service: 'new', color: 'rgb(129, 199, 132,0.8)' },
        { service: 'postponed', color: 'rgb(241,196,15,0.8)' },
        { service: 'canceled', color: 'rgb(254, 111, 103,0.8)' },
        { service: 'completed', color: 'rgb(214,232,255,0.8)' },
        { service: 'inWork', color: 'rgb(254, 145, 40,0.8)' },
        { service: 'disrupt', color: 'rgb(254, 111, 103,0.8)' },
        { service: 'activated', color: 'rgb(129, 199, 132,0.8)' },
        { service: 'not_activated', color: 'rgb(254, 111, 103,0.8)' },
        { service: 'none', color: 'rgb(255, 255, 255,0.8)' },
        { service: 'free', color: 'rgb(254, 111, 103,0.8)' },
        { service: 'standart', color: 'rgb(241,196,15,0.8)' },
        { service: 'professional', color: 'rgb(129, 199, 132,0.8)' },
    ]

    let translatedValue = color.find(el => el.service === value).color

    if (translatedValue === 'rgb(169, 169, 169)') {
        translatedValue = value
    }
    return translatedValue
}
