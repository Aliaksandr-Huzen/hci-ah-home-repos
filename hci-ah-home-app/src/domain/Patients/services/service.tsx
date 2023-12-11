import { config } from '../../../config'
import { cancel, client, withCancelTocken } from '../../Client/services/client'
import { ResponsePromise } from '../../Client/services/request'
import { ExpandablePatient, Patient } from './types'

export interface IPatientsService {
    doSearch: (search?: string) => ResponsePromise<Patient[]>
    getExpandable: (id: string) => ResponsePromise<ExpandablePatient>
}

export const patientsService: IPatientsService = {
    doSearch(search?: string) {
        cancel()

        return client.get<Patient[]>(config.patients.doSearch, {
            params: { search },
            cancelToken: withCancelTocken(),
        })
    },

    getExpandable(id: string) {
        return client.get<ExpandablePatient>(config.patients.getExpandable(id))
    },
}
