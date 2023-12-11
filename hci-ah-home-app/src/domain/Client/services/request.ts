/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

export interface RequestStatus<T> {
    data: T
    loading: boolean
    error: any
}

export interface ResponsePromise<T = any> extends Promise<AxiosResponse<T>> {}

export const useRequest = <T>(
    getPromise: () => ResponsePromise | undefined,
    deps: any[] = []
): RequestStatus<T | undefined> => {
    const [data, setData] = useState<T>(),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(false)

    useEffect(
        () => {
            ;(async function getRequest() {
                setLoading(true)
                try {
                    const promise = getPromise(),
                        data = await promise
                    setData(data?.data)
                } catch (error: any) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
            })()
        },
        // eslint-disable-next-line
        deps)

    return { data, error, loading }
}
