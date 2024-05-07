import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/common/ui/header'

import s from './layout.module.scss'

type Props = {
  children?: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />

      <main className={s.wrapper}>
        <Outlet />
        {children}
      </main>
    </>
  )
}
