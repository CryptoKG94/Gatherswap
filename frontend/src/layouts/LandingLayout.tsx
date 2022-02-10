import React, { FC } from 'react'

export interface Layout {
  id: string
}

export const Layout: FC<Layout> = ({ children, id }) => {
  return (
    <div className="bg-blue-03">
      {children}
    </div>
  )
}

type LandingLayout = (id: string) => FC
export const LandingLayout: LandingLayout = (id: string) => {
  return (props) => <Layout id={id} {...props} />
}
