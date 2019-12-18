import classNames from '../classNames'

export default app => {
  const BODY = app.dom.body

  document.addEventListener('click', e => {
    const btn =
      e.target.closest(`.${classNames.scrollTo.btn}`) ||
      e.target.closest(`.${classNames.scrollTo.top}`)

    if (!btn) return
    if (btn.classList.contains(classNames.scrollTo.top)) {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      const href = btn.getAttribute('href')
      const target = document.querySelector(href)

      if (!target) return
      e.preventDefault()
      const { header } = app.dom

      if (!header) return

      const offset = header.offsetHeight

      const top = target.getBoundingClientRect().top + BODY.scrollTop - offset

      window.scrollBy({
        top,
        behavior: 'smooth',
      })

      if (app.state.hasMenuOpen) app.menu.close()
    }
  })
}
