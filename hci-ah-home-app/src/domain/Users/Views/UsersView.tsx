import { FunctionComponent, Suspense } from 'react'
import { PageLayout } from '../../Library/components/Layout/PageLayout/PageLayout'
import { Loading } from '../../Library/components/Loading/Loading'

export const UsersView: FunctionComponent = () => {
    return (
        <PageLayout
            title={'Users'}
            description={'Users'}
            content={() => (
                <Suspense fallback={<Loading />}>
                    <p>Hello</p>
                </Suspense>
            )}
        />
    )
}
