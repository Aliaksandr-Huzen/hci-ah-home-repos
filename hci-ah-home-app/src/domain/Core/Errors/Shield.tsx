/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { PropsWithChildren } from 'react'

export interface ShieldState {
    error: Error | null | undefined
}

export interface ShieldProps extends PropsWithChildren {
    getErrorView: (error: Error) => JSX.Element
}

export class Shield extends React.Component<ShieldProps, ShieldState> {
    constructor(props: any) {
        super(props)
        this.state = {
            error: null,
        }
    }

    componentDidCatch(error: Error | null) {
        this.setState({
            error,
        })
    }

    render() {
        if (this.state.error) {
            return this.props.getErrorView(this.state.error)
        }

        return this.props.children
    }
}
