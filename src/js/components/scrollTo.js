import classes from '../classNames'
import { IS_CURRENT } from '../constants'
import { BEMblock } from '../helpers'

const classNames = classes.scrollTo

export default app => {
  const BODY = app.dom.body
  const { sections, btns } = app.dom.scrollTo
  const { header } = app.dom
  const navLinkClass = 'nav__link'

  function handleClick(e) {
    const btn = e.target.closest(`.${classNames.btn}`) || e.target.closest(`.${classNames.top}`)

    if (!btn) return
    if (btn.classList.contains(classNames.top)) {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      const href = btn.getAttribute('href')
      const target = document.querySelector(href)

      if (!target || !header) return
      e.preventDefault()

      const offset = header.offsetHeight
      const top = target.getBoundingClientRect().top + BODY.scrollTop - offset

      window.scrollBy({
        top,
        behavior: 'smooth',
      })

      if (app.state.hasMenuOpen) app.menu.close()
    }
  }

  function handleIntersecting(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const { id } = entry.target

        const [currentBtn] = btns.filter(btn => btn.getAttribute('href') === `#${id}`)

        btns.forEach(btn => {
          if (btn !== currentBtn) BEMblock(btn, navLinkClass).removeMod(IS_CURRENT)
          BEMblock(currentBtn, navLinkClass).addMod(IS_CURRENT)
        })
      }
    })
  }

  function initIntersecting() {
    if (!sections.length || !btns.length) return

    const observer = new IntersectionObserver(handleIntersecting, {
      threshold: 0.2,
    })
    sections.forEach(section => {
      observer.observe(section)
    })
  }

  document.addEventListener('click', handleClick)
  initIntersecting()
}
