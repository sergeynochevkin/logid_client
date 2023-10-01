import { useContext, useEffect } from "react"
import { FetcherContext, UserContext, UserInfoContext } from ".."
import { fetchUserInfo } from "../http/userInfoApi"

export const useFetcherUserInfo = (imageHandler) => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { fetcher } = useContext(FetcherContext)

    async function fetch() {
        await fetchUserInfo(user.user.id).then(data => {
            UserInfo.setUserInfo(data)
            imageHandler([data])
        }
        )
    }
    useEffect(() => {
        fetcher.user_info && fetch()
        fetcher.setUserInfo(false)
    }, [fetcher.user_info])

    return []
}
