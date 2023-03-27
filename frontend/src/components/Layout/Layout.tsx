import React, {ReactNode} from 'react'
import Header from '../Header/Header'

type Props = {
    children: ReactNode
}

function Layout(props: Props) {
    return (
        <>
            <Header/>
            <main className="main">{props.children}</main>
        </>
    )
}

export default Layout