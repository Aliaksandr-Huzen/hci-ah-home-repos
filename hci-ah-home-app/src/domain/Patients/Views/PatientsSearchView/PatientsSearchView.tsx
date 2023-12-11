import { FunctionComponent, Suspense, useContext, useState } from 'react'
import { PageLayout } from '../../../Library/components/Layout/PageLayout/PageLayout'
import { Loading } from '../../../Library/components/Loading/Loading'
import { Search } from '../../components/Search/Search'
import { useDoSearch } from '../../services/hooks'
import useDebounce from '../../../Core/utils/use-debounce'
import {
    ActivityIndicator,
    ActivityIndicatorEnumType,
} from '../../../Core/components/ActivityIndicator/ActicvityIndicator'

import styles from './PatientsSearchView.module.scss'
import { LocaleContext } from '../../../Core/Providers/LocaleProvider'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../../routes'

export const PatientsSearchView: FunctionComponent = () => {
    const [search, setSearch] = useState('')

    const debouncedFilter = useDebounce(search)

    const result = useDoSearch(debouncedFilter)

    const locale = useContext(LocaleContext)

    const navigate = useNavigate()

    return (
        <PageLayout
            title={'Patients Search'}
            description={'Patients Search'}
            content={() => (
                <Suspense fallback={<Loading />}>
                    <Search onSearch={setSearch} />
                    <div className={styles.container}>
                        {search ? (
                            result.loading || (!result.data && !result.error) ? (
                                <ActivityIndicator className={styles.loader} size={ActivityIndicatorEnumType.large} />
                            ) : result.error ? (
                                <div>
                                    <div className={styles.errorText}>{locale._('patientsSearchView.errorText')}</div>
                                </div>
                            ) : (
                                <div className={styles.content}>
                                    {result.data && result.data.length > 0 ? (
                                        result.data?.map((t, i) => {
                                            return (
                                                <div
                                                    key={`p_${i}`}
                                                    className={styles.patientInfo}
                                                    onClick={() => navigate(routes.patients.details(t.id))}
                                                >
                                                    <span>{`${t.firstName} ${t.lastName}`}</span>
                                                    <span>{t.email}</span>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className={styles.emptyMessage}>
                                            {locale._('patientsSearchView.noResultMessage')}
                                        </div>
                                    )}
                                </div>
                            )
                        ) : (
                            <div className={styles.emptyMessage}>{locale._('patientsSearchView.emptyMessage')}</div>
                        )}
                    </div>
                </Suspense>
            )}
        />
    )
}
