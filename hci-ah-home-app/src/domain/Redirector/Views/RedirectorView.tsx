import { FunctionComponent } from 'react'
import { Navigate } from 'react-router-dom'
import { config } from '../../../config'

export const RedirectorView: FunctionComponent = () => {
    return <Navigate replace={true} to={config.defaultPath} />
}
