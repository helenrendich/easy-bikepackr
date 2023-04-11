import React, {ReactNode} from 'react'
import Header from './Header'
import BottomNavigation from "./BottomNavigation";

type Props = {
    children: ReactNode
}

function Layout(props: Props) {
    return (
        <>
            <Header/>
            <main className="main">{props.children}</main>
            <BottomNavigation/>
        </>
    )
}

export default Layout