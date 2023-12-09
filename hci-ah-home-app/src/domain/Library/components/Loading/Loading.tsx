import { FunctionComponent } from 'react'
import styles from './Loading.module.scss'
import {
    ActivityIndicator,
    ActivityIndicatorEnumType,
} from '../../../Core/components/ActivityIndicator/ActicvityIndicator'

export const Loading: FunctionComponent = () => {
    return (
        <div className={styles.container}>
            <ActivityIndicator className={styles.activity} size={ActivityIndicatorEnumType.large} />
        </div>
    )
}
