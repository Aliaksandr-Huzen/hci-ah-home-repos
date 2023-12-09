import styles from './ErrorLayout.module.scss'

import classNames, { Argument } from 'classnames'

interface Props {
    className?: Argument
    content: () => JSX.Element
}

export const ErrorLayout: React.FunctionComponent<Props> = ({ className, content }) => {
    return (
        <div className={classNames(styles.container, className)}>
            <div className={classNames(styles.wrapper)}>{content()}</div>
        </div>
    )
}
