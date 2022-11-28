import  { useContext, useState } from 'react'
import { LoadingContext } from '..'

export const useFetching = (callback) => {
    const { loading } = useContext(LoadingContext)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            loading.setLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {           
                loading.setLoading(false)           
        }
    }

    return [fetching, error]
}
