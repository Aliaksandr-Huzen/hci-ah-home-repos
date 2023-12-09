import './styles/base.scss'

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'core-js/web/url-search-params'

import { FunctionComponent } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { RootView } from './RootView'
import { config } from './config'
import { LocaleProvider } from './domain/Core/Providers/LocaleProvider'

const App: FunctionComponent = () => {
    return (
        <LocaleProvider
            currentLocale={config.defaultLocale}
            getCatalog={language => {
                return require(
                    /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
                    `./locales/${language}/messages`
                )
            }}
        >
            <Router>
                <RootView />
            </Router>
        </LocaleProvider>
    )
}

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(<App />)
