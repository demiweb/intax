import CustomSelect from 'select-custom'

export default class MySelect extends CustomSelect {
  constructor(select, props) {
    super(select, props)
    this.name = select.dataset.type
  }

  // getElements() {
  //   this.panelOptions = [
  //     ...this.select.querySelectorAll('.custom-select__option')
  //   ]
  //   this.input = this.select.querySelector('.js-search')
  // }

  // onOpen() {
  //   console.log('open')
  // }

  // onClose() {
  //   console.log('close')
  // }

  init() {
    if (this.select.classList && this.select.classList.contains('custom-select')) {
      return
    }
    super.init()

    // // ================ helper functions ======================
    // this.getElements()
    // addSelectsPlaceholder.call(this)
    // filterSearch.call(this)
    // // ================ helper functions ======================
  }
}
