/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import { GlobalErrorView } from './domain/Errors/Views/GlobalErrorView'
import { PatientsSearchView } from './domain/Patients/Views/PatientsSearchView/PatientsSearchView'
import { Helmet } from 'react-helmet'
import { RedirectorView } from './domain/Redirector/Views/RedirectorView'
import { Shield } from './domain/Core/Errors/Shield'
import { PatientsDetailsView } from './domain/Patients/Views/PatientsDetailsView/PatientsDetailsView'

export const RootView: FunctionComponent = () => {
    return (
        <Shield
            getErrorView={(error: any) => {
                return <GlobalErrorView error={error} />
            }}
        >
            <Helmet titleTemplate={'HCI | %s'} />

            <Routes>
                <Route path={routes.patients.search} element={<PatientsSearchView />} />
                <Route path={routes.patients.details()} element={<PatientsDetailsView />} />
                <Route path="*" element={<RedirectorView />} />
            </Routes>
        </Shield>
    )
}
