const regexpEnvPlaceholder = /^{{[A-Z_0-9]+}}$/

export function getEnv(name: string, defaultValue: string = ''): string {
    if (window.__ENV && window.__ENV[name] && !window.__ENV[name].match(regexpEnvPlaceholder)) {
        return window.__ENV[name]
    }
    return process.env[`REACT_APP_${name}`] || defaultValue
}

export interface Config {
    defaultPath: string

    basePath: string

    defaultLocale: string

    patients: {
        doSearch: string
        getExpandable: (id: string) => string
    }
}

export const config: Config = {
    defaultPath: getEnv('DEFAULT_PATH', '/'),

    basePath: getEnv('BASE_PATH'),

    defaultLocale: 'en',

    patients: {
        doSearch: 'api/patients',
        getExpandable: (id: string) => `api/patients/${id}/expandable`,
    },
}
