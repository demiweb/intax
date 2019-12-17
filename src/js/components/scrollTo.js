import classNames from '../classNames'

export default () => {
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
      const header = document.querySelector('.header')
      if (!header) return
      const headerBottom = header.querySelector('.header__bottom')
      if (!headerBottom) return

      const offset = headerBottom.offsetHeight

      const top = target.getBoundingClientRect().top + document.body.scrollTop - offset

      window.scrollBy({
        top,
        behavior: 'smooth',
      })
    }
  })
}
