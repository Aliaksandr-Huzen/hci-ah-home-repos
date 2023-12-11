/*eslint-disable import/no-named-as-default-member */

import axios, { CancelTokenSource } from 'axios'
import { config } from '../../../config'

export const client = axios.create({
    baseURL: config.basePath,
    responseType: 'json',
})

let cancelTocken: CancelTokenSource

export const withCancelTocken = () => {
    cancelTocken = axios.CancelToken.source()
    return cancelTocken.token
}

export const cancel = () => {
    cancelTocken && cancelTocken.cancel('Operation canceld due to new request')
}
