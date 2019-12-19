import { throttle } from 'throttle-debounce'
import { BEMblock } from '../../helpers'
import { IS_SHRINKED, HAS_SHRINKED_HEADER } from '../../constants'

export default app => {
  const BODY = app.dom.body
  const { header } = app.dom
  if (!header) return

  const handleScroll = () => {
    if (!window.matchMedia('(min-width: 1200px)').matches) {
      if (!app.dom.body.classList.contains(HAS_SHRINKED_HEADER)) return
      BODY.classList.remove(HAS_SHRINKED_HEADER)
      return
    }

    if (window.pageYOffset > 0) {
      BEMblock(header, 'header').addMod(IS_SHRINKED)
      BODY.classList.add(HAS_SHRINKED_HEADER)
    } else {
      BEMblock(header, 'header').removeMod(IS_SHRINKED)
      BODY.classList.remove(HAS_SHRINKED_HEADER)
    }
  }

  const onScroll = throttle(66, handleScroll)
  window.addEventListener('scroll', onScroll)
}
