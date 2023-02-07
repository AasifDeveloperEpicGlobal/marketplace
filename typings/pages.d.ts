import type { NextPage } from 'next'
import type { AppProps } from 'next/app'


type NextPageWithLayout = NextPage & {
    layout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}