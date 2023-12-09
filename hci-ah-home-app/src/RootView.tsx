/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import { GlobalErrorView } from './domain/Errors/Views/GlobalErrorView'
import { UsersView } from './domain/Users/Views/UsersView'
import { Helmet } from 'react-helmet'
import { RedirectorView } from './domain/Redirector/Views/RedirectorView'
import { Shield } from './domain/Core/Errors/Shield'

export const RootView: FunctionComponent = () => {
    return (
        <Shield
            getErrorView={(error: any) => {
                return <GlobalErrorView error={error} />
            }}
        >
            <Helmet titleTemplate={'HCI | %s'} />

            <Routes>
                <Route path={routes.index} element={<UsersView />} />
                <Route path="*" element={<RedirectorView />} />
            </Routes>
        </Shield>
    )
}
