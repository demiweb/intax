// import MySelect from './MySelect'
import CustomSelect from 'select-custom'
import classNames from '../../classNames'

export default () => {
  const selects = [...document.querySelectorAll(`.${classNames.select}`)]
  if (!selects.length) return

  const options = {
    default: {},
  }

  selects.forEach(select => {
    if (
      select.parentNode &&
      select.parentNode.classList &&
      select.parentNode.classList.contains('custom-select')
    )
      return

    const name = select.dataset.type
    const mySelect = new CustomSelect(select, options[name])
    mySelect.init()

    select.parentNode.setAttribute('tabindex', '0')
  })
}
