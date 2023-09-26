import { useContext, useEffect } from "react"
import { DriverContext, FetcherContext, UserContext } from ".."
import { fetchDrivers } from "../http/userAPI"

export const useFetcherDriver = (fetchImages) => {
    const { Driver } = useContext(DriverContext)
    const { user } = useContext(UserContext)
    const { fetcher } = useContext(FetcherContext)

    useEffect(() => {
        async function fetch() {
            await fetchDrivers(user.user.id).then(data => {
                Driver.setDrivers(data)
            }
            ) 
        }
        fetcher.drivers && fetch()
        fetcher.setDrivers(false)
    }, [fetcher.drivers])

    return []
}
