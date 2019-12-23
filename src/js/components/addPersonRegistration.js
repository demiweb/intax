import classes from '../classNames'
import { BEMblock } from '../helpers'
import { IS_HIDDEN } from '../constants'

const classNames = classes.participants

export default () => {
  const selects = [...document.querySelectorAll(`.${classNames.select}`)]
  if (!selects.length) return

  function handleChange(e) {
    const select = e.currentTarget
    const form = select.closest('form')
    const participantsWrap = form.querySelector(`.${classNames.forms}`)
    const blocksLength = +select.value
    if (!participantsWrap || !blocksLength) return
    const [block] = participantsWrap.children

    participantsWrap.innerHTML = ''
    BEMblock(block, 'form__block').removeMod(IS_HIDDEN)
    for (let i = 0; i < blocksLength; i++) {
      const blockClone = block.cloneNode(true)
      const title = blockClone.querySelector('.title')
      const titleText = `${title.dataset.title}${i + 1}`

      title.innerHTML = titleText
      participantsWrap.appendChild(blockClone)
    }
  }

  selects.forEach(select => {
    select.addEventListener('change', handleChange)
  })
}
