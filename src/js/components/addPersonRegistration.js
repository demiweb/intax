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

    const blockHMTL = block.outerHTML
    let content = ''

    participantsWrap.innerHTML = ''

    for (let i = 0; i < blocksLength; i++) {
      content = content.concat(blockHMTL)

      participantsWrap.innerHTML = content
    }

    const nodes = [...participantsWrap.children]
    nodes.forEach((node, i) => {
      BEMblock(node, 'form__block').removeMod(IS_HIDDEN)
      const title = node.querySelector('.title')
      if (!title) return
      title.innerHTML = `${title.dataset.title}${i + 1}`
    })
  }

  selects.forEach(select => {
    select.addEventListener('change', handleChange)
  })
}
