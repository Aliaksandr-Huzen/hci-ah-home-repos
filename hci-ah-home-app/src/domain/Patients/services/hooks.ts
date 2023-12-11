import { ExpandablePatient, Patient } from './types'
import { patientsService } from './service'
import { RequestStatus, useRequest } from '../../Client/services/request'

export const useDoSearch = (search?: string): RequestStatus<Patient[] | undefined> => {
    const getProsmise = () => (search ? patientsService.doSearch(search) : undefined)

    return useRequest(getProsmise, [search])
}

export const useGetExpandable = (id: string): RequestStatus<ExpandablePatient | undefined> => {
    const getProsmise = () => patientsService.getExpandable(id)

    return useRequest(getProsmise, [id])
}
