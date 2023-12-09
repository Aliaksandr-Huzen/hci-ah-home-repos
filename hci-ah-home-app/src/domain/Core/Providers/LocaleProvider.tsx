import React, { useState, useEffect, PropsWithChildren } from 'react'
import { I18nProvider } from '@lingui/react'
import { I18n, i18n } from '@lingui/core'
import * as plurals from 'make-plural/plurals'

interface Props extends PropsWithChildren {
    currentLocale: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCatalog: (language: string) => Promise<any>
}

export interface LocaleContextValue {
    currentLocale: string
    changeLocale: (locale: string) => Promise<void>
    loading: boolean
    _: I18n['_']
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LocaleContext = React.createContext<LocaleContextValue>(undefined as any)

export const LocaleProvider: React.FunctionComponent<Props> = props => {
    const [loading, setLoading] = useState(true)
    const [currentLocale, setCurrentLocale] = useState(props.currentLocale)

    async function changeLocale(locale: string) {
        setLoading(true)
        setCurrentLocale(locale)

        try {
            const catalog = await props.getCatalog(locale)

            const plural = locale.split('-')[0].toLowerCase() as keyof typeof plurals

            // eslint-disable-next-line import/namespace
            i18n.loadLocaleData(locale, { plurals: plurals[plural] })

            i18n.load(locale, catalog.messages)
            i18n.activate(locale)

            setLoading(false)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        ;(async function change() {
            await changeLocale(props.currentLocale)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) return null

    return (
        <I18nProvider i18n={i18n}>
            <LocaleContext.Provider
                value={{
                    currentLocale,
                    changeLocale: changeLocale,
                    loading,
                    _: i18n._.bind(i18n),
                }}
            >
                {props.children}
            </LocaleContext.Provider>
        </I18nProvider>
    )
}
