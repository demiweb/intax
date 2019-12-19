import classes from '../classNames'
// import { IS_ACTIVE } from '../constants'

const IS_ACTIVE = 'is-active'

const classNames = classes.scrollTo

export default app => {
  const BODY = app.dom.body
  const { sections, btns } = app.dom.scrollTo
  const { header } = app.dom

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
          if (btn !== currentBtn) btn.classList.remove(IS_ACTIVE)
          currentBtn.classList.add(IS_ACTIVE)
        })
      }
    })
  }

  function initIntersecting() {
    if (!sections.length || !btns.length) return

    const observer = new IntersectionObserver(handleIntersecting, {
      threshold: 0.05,
    })
    sections.forEach(section => {
      observer.observe(section)
    })
  }

  document.addEventListener('click', handleClick)
  initIntersecting()
}
