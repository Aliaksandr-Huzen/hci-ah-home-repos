import { FunctionComponent, useEffect, useState } from 'react'
import styles from './Search.module.scss'

export interface SearchParams {
    onSearch: (search: string) => void
}

export const Search: FunctionComponent<SearchParams> = ({ onSearch }) => {
    const [search, setSearch] = useState('')

    useEffect(() => {
        onSearch(search)
    }, [search, onSearch])

    return (
        <div className={styles.conainter}>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={'Type a patient`s name or email, e.g. a or ali or vin'}
                className={styles.search}
                // eslint-disable-next-line
                autoFocus={true}
            />
        </div>
    )
}
