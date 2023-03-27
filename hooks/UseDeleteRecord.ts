import { AxiosInstance, AxiosResponse } from "axios"
import { useEffect, useState } from "react"

const useDeleteRecord = (request: (params: { id: string | number } | null) => Promise<any>) => {
    const [data, setData] = useState<AxiosResponse['data']>()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState<{ id: string | number } | null>(null)
    const sendRequest = (params: { id: string | number } | null) => setParams(params)
    const clearAll = () =>{
        setData(undefined)
        setError(undefined)
        setLoading(false)
        setParams(null)
    }
    useEffect(() => {
        if (params?.id) {
            setLoading(true)
            request(params)
                .then((data) => setData(data))
                .catch((error) => setError(error))
                .finally(() => setLoading(false))
        }
    }, [params?.id])
    return [data, error, loading, sendRequest ,clearAll]
}
export { useDeleteRecord }