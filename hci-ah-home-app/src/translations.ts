import { defineMessage } from '@lingui/macro'

export const translations = {
    errorView: {
        text: defineMessage({
            id: 'errorView.text',
            message: 'Ops! Something went wrong. But we will help you find your way.',
        }),
    },
    search: {
        placeholder: defineMessage({
            id: 'search.placeholder',
            message: 'Type a patient`s name or email, e.g. a or ali or vin',
        }),
    },
    patientsSearchView: {
        errorText: defineMessage({
            id: 'patientsSearchView.errorText',
            message: 'Ops! Something went wrong! But don&apos;t worry and just try again.',
        }),
        emptyMessage: defineMessage({
            id: 'patientsSearchView.emptyMessage',
            message: 'Please do a search',
        }),
        noResultMessage: defineMessage({
            id: 'patientsSearchView.noResultMessage',
            message: 'Ops! Nothing',
        }),
    },
    patientsDetailsView: {
        errorText: defineMessage({
            id: 'patientsDetailsView.errorText',
            message: 'Ops! Something went wrong! But don&apos;t worry and just try again.',
        }),
        noVisitsMessage: defineMessage({
            id: 'patientsDetailsView.noVisitsMessage',
            message: 'No visits',
        }),
    },
}
