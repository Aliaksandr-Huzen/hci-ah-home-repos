import { Suspense } from 'react'
import classNames, { Argument } from 'classnames'

import { Helmet } from 'react-helmet'
import { Loading } from '../../Loading/Loading'

import styles from './PageLayout.module.scss'

interface Props {
    title: string
    description: string
    className?: Argument
    content: () => JSX.Element
}

export const PageLayout: React.FunctionComponent<Props> = ({ className, title, description, content }) => {
    return (
        <Suspense fallback={<Loading />}>
            <div className={classNames(styles.container, className)}>
                <Helmet title={title}>
                    <meta name="description" content={description} />
                </Helmet>

                <div className={classNames(styles.wrapper)}>{content()}</div>
            </div>
        </Suspense>
    )
}
