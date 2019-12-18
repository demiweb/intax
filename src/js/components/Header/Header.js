import { throttle } from 'throttle-debounce'
import classNames from '../../classNames'
import { BEMblock } from '../../helpers'
import { IS_FIXED } from '../../constants'

export default app => {
  const { header } = app.dom
  if (!header) return

  const handleScroll = () => {
    const headerTop = header.querySelector('.header__top')
    const headerBottom = header.querySelector('.header__bottom')
    if (!headerTop || !headerBottom) return
    if (window.pageYOffset >= headerTop.offsetHeight) {
      BEMblock(header, 'header').addMod(IS_FIXED)
    } else {
      BEMblock(header, 'header').removeMod(IS_FIXED)
    }
  }

  const onScroll = throttle(66, handleScroll)

  window.addEventListener('scroll', onScroll)
}
