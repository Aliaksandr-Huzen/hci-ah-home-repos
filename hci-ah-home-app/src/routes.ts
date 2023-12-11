export const routes = {
    patients: {
        search: '/patients',
        details: (id: string = ':id') => `/patients/${id}`,
    },
}
