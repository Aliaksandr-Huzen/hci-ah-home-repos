/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from 'react'
import { ErrorLayout } from '../../Library/components/Layout/ErrorLayout/ErrorLayout'

export interface ErrorViewParams {
    error?: any
}

export const GlobalErrorView: React.FunctionComponent<ErrorViewParams> = ({ error }) => {
    const status: string = String(error?.error?.status || 500)

    return <ErrorLayout content={() => <div>{status}</div>} />
}
