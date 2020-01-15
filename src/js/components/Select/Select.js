// import MySelect from './MySelect'
import CustomSelect from 'select-custom'
import classNames from '../../classNames'
import filterSearch from './filterSearch'

export default () => {
  const selects = [...document.querySelectorAll(`.${classNames.select}`)]
  if (!selects.length) return

  const options = {
    default: {},
    with_search: {
      panelItem: {
        position: 'top',
        item: '<input type="text" class="js-search" placeholder="" />',
      },
    },
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

    const wrap = select.parentNode
    const search = wrap.querySelector('.js-search')
    const customOptions = [...wrap.querySelectorAll('.custom-select__option')]

    filterSearch(search, customOptions)

    select.parentNode.setAttribute('tabindex', '0')
  })
}
