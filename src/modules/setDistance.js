export const setDistance = (distance) => {
    let currentDistance = `${(distance / 1000).toFixed(1)} км`
    return currentDistance
}
