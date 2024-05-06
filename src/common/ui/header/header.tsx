import { Link } from 'react-router-dom'

import s from './header.module.scss'

type Props = {
  className?: string
}

export const Header = ({ className, ...rest }: Props) => {
  return (
    <header className={s.headerWrapper}>
      <div className={s.header} {...rest}>
        <Link to={'/'}>Header logo</Link>
      </div>
    </header>
  )
}
