import { useLocation } from "react-router-dom"

export const useBannerActionContent = ()=>{
    const location = useLocation()
    return {location}
}