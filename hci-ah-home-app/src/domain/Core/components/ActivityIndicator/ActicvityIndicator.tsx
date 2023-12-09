import classNames, { Argument } from 'classnames'
import React, { FunctionComponent } from 'react'
import styles from './ActivityIndicator.module.scss'

export enum ActivityIndicatorEnumType {
    extrasmall = 'extrasmall',
    small = 'small',
    medium = 'medium',
    large = 'large',
}

interface Props {
    className?: Argument
    size?: ActivityIndicatorEnumType
    isBranded?: boolean
}

export const ActivityIndicator: FunctionComponent<Props> = ({ className, size = ActivityIndicatorEnumType.small }) => {
    return (
        <div
            className={classNames(className, {
                [styles.isSizeLarge]: size === ActivityIndicatorEnumType.large,
                [styles.isSizeMedium]: size === ActivityIndicatorEnumType.medium,
                [styles.isSizeSmall]: size === ActivityIndicatorEnumType.small,
                [styles.isSizeExtraSmall]: size === ActivityIndicatorEnumType.extrasmall,
            })}
        >
            <div className={styles.ring}>
                <div
                    className={classNames(styles.ringPartial, {
                        [styles.isSizeLarge]: size === ActivityIndicatorEnumType.large,
                        [styles.isSizeMedium]: size === ActivityIndicatorEnumType.medium,
                        [styles.isSizeSmall]: size === ActivityIndicatorEnumType.small,
                    })}
                />
                <div
                    className={classNames(styles.ringPartial, {
                        [styles.isSizeLarge]: size === ActivityIndicatorEnumType.large,
                        [styles.isSizeMedium]: size === ActivityIndicatorEnumType.medium,
                        [styles.isSizeSmall]: size === ActivityIndicatorEnumType.small,
                    })}
                />
                <div
                    className={classNames(styles.ringPartial, {
                        [styles.isSizeLarge]: size === ActivityIndicatorEnumType.large,
                        [styles.isSizeMedium]: size === ActivityIndicatorEnumType.medium,
                        [styles.isSizeSmall]: size === ActivityIndicatorEnumType.small,
                    })}
                />
                <div
                    className={classNames(styles.ringPartial, {
                        [styles.isSizeLarge]: size === ActivityIndicatorEnumType.large,
                        [styles.isSizeMedium]: size === ActivityIndicatorEnumType.medium,
                        [styles.isSizeSmall]: size === ActivityIndicatorEnumType.small,
                    })}
                />
            </div>
            <div
                className={classNames(styles.backRing, {
                    [styles.isSizeLarge]: size === ActivityIndicatorEnumType.large,
                    [styles.isSizeMedium]: size === ActivityIndicatorEnumType.medium,
                    [styles.isSizeSmall]: size === ActivityIndicatorEnumType.small,
                })}
            />
        </div>
    )
}
