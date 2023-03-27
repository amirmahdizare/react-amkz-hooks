import { AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"
type paramsType = { page?: number, pagination_size?: number, [key: string]: any, } & { [key: string]: any }
const useGetData = (request: (params: paramsType) => Promise<any>, initialDataState: Array<any> | object, params: paramsType = {}) => {
    const [data, setData] = useState<AxiosResponse['data']>(initialDataState)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [refreshData, setRefreshData] = useState<boolean>(false)

    const fetchData = useCallback(() => setRefreshData((refreshData) => !refreshData), [request, params])

    useEffect(() => {
        setLoading(true)
        request(params)
            .then((data: AxiosResponse['data']) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [params?.page, params?.pagination_size, refreshData])
    return [data, error, loading, fetchData, () => setError(undefined)]

}
export { useGetData }
