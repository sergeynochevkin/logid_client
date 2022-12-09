export const setDuration = (duration) => {
    let currentDuration = `${Math.ceil(duration / 60) < 60 ? `${Math.ceil(duration / 60)} мин` : `${Math.floor(duration / 60 / 60)} h ${Math.floor(duration / 60) - Math.floor(duration / 60 / 60) * 60} min`}`
    return currentDuration
}
