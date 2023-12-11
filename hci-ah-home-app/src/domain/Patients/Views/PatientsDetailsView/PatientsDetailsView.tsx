import { FunctionComponent, Suspense, useContext } from 'react'
import { PageLayout } from '../../../Library/components/Layout/PageLayout/PageLayout'
import { Loading } from '../../../Library/components/Loading/Loading'

import { useParams } from 'react-router-dom'

import { LocaleContext } from '../../../Core/Providers/LocaleProvider'
import {
    ActivityIndicator,
    ActivityIndicatorEnumType,
} from '../../../Core/components/ActivityIndicator/ActicvityIndicator'
import { useGetExpandable } from '../../services/hooks'

import styles from './PatientsDetailsView.module.scss'

export const PatientsDetailsView: FunctionComponent = () => {
    const { id } = useParams()

    const locale = useContext(LocaleContext)

    const result = useGetExpandable(id!)

    return (
        <PageLayout
            title={'Patient Details'}
            description={'Patient Details'}
            content={() => (
                <Suspense fallback={<Loading />}>
                    <div className={styles.container}>
                        {result.loading || (!result.data && !result.error) ? (
                            <ActivityIndicator className={styles.loader} size={ActivityIndicatorEnumType.large} />
                        ) : result.error ? (
                            <div>
                                <div className={styles.errorText}>{locale._('patientsDetailsView.errorText')}</div>
                            </div>
                        ) : (
                            <div className={styles.content}>
                                <div>{`${result.data?.firstName} ${result.data?.lastName}`}</div>
                                <div>{result.data?.email}</div>
                                <div className={styles.history}>History</div>
                                {result.data?.hospitalVisits && result.data.hospitalVisits.length > 0 ? (
                                    result.data.hospitalVisits.map((t, i) => {
                                        return (
                                            <div key={`hv_${i}`} className={styles.visits}>
                                                <span>{t.hospitalName}</span>
                                                <span>{t.visitDate.toString()}</span>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className={styles.noVisit}>
                                        {locale._('patientsDetailsView.noVisitsMessage')}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Suspense>
            )}
        />
    )
}
