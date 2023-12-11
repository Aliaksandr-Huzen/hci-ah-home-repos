import { FunctionComponent, useContext, useEffect, useState } from 'react'
import styles from './Search.module.scss'
import { LocaleContext } from '../../../Core/Providers/LocaleProvider'

export interface SearchParams {
    onSearch: (search: string) => void
}

export const Search: FunctionComponent<SearchParams> = ({ onSearch }) => {
    const [search, setSearch] = useState('')

    const locale = useContext(LocaleContext)

    useEffect(() => {
        onSearch(search)
    }, [search, onSearch])

    return (
        <div className={styles.conainter}>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={locale._('search.placeholder')}
                className={styles.search}
                // eslint-disable-next-line
                autoFocus={true}
            />
        </div>
    )
}
