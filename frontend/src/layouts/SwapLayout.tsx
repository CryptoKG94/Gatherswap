import Container from 'app/components/Container'
import DoubleGlowShadow from 'app/components/DoubleGlowShadow'
import React, { FC } from 'react'

import DefaultLayout from './Default'

export interface Layout {
  id: string
}

export const SwapLayoutCard: FC = ({ children }) => {
  return (
    <div className="flex flex-col gap-3 bg-blue-01 md:p-4 pt-4 border border-blue-700 p-3 rounded-lg">
      {/* <div className="flex flex-col gap-3 p-2 md:p-4 pt-4 rounded-[24px] bg-dark-800 shadow-md shadow-dark-1000"> */}
      {children}
    </div>
  )
}

export const Layout: FC<Layout> = ({ children, id }) => {
  return (
    <DefaultLayout>
      <Container id={id} maxWidth="7xl" className="py-2 sm:px-6 lg:px-8 px-2 md:py-2 lg:py-[20px]">
        <DoubleGlowShadow>{children}</DoubleGlowShadow>
      </Container>
    </DefaultLayout>
  )
}

type SwapLayout = (id: string) => FC
export const SwapLayout: SwapLayout = (id: string) => {
  return (props) => <Layout id={id} {...props} />
}
