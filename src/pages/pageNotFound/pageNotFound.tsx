import s from './pageNotFound.module.scss'

export const PageNotFound = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.pageNotFoundWrapper}>
        <img
          alt={'image'}
          src={
            'https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Typed-Message.png'
          }
        />
      </div>
    </section>
  )
}
