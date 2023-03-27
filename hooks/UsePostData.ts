import { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"

const usePostData = () : [AxiosResponse['data'] | undefined , AxiosError | undefined  , boolean , (callback : Function , data:any)=>void ,()=>void] => {

    const [result, setResult] = useState<AxiosResponse['data'] | undefined>()
    const [error, setError] = useState<AxiosError & {[key:string]:any} |   undefined >()
    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState<{callback:Function , data:any}>({
        callback: ()=>Promise.resolve(),
        data: null

    })
    const handleRequest = (callback : Function , data:any) => {
        setRequest({ callback, data })
    }
    const clear = () =>{
        setLoading(false)
        setError(undefined)
        setResult(undefined)
    }
    useEffect(() => {
        const { callback, data } = request
        if (callback) {
            setLoading(true)
            callback(data)
                .then((res:AxiosResponse) => setResult(res))
                .catch((err:AxiosError) => setError(err || true))
                .finally(() => setLoading(false))
        }

    }, [request])

    return [result, error, loading, handleRequest, () => clear()]

}
export { usePostData }