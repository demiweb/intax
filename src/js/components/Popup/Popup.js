import Popup from 'popup-simple'
import classes from '../../classNames'

const classNames = classes.popup

export default class MyPopup extends Popup {
  get infoCard() {
    return this.btn.closest(`.${classNames.info.card}`)
  }

  get infoCardEls() {
    return {
      title: this.infoCard.querySelector(`.${classNames.info.title}`),
      text: this.infoCard.querySelector(`.${classNames.info.text}`),
      img: this.infoCard.querySelector(`.${classNames.info.img}`),
    }
  }

  get infoPopupEls() {
    return {
      title: this.popup.querySelector(`.${classNames.info.title}`),
      text: this.popup.querySelector(`.${classNames.info.text}`),
      img: this.popup.querySelector(`.${classNames.info.img}`),
    }
  }

  addContent() {
    const content = {}

    const cardEls = this.infoCardEls
    const popupEls = this.infoPopupEls

    // eslint-disable-next-line
    for (const key in cardEls) {
      const el = cardEls[key]

      const data = el.dataset.popupInfo
      let info
      if (!data) return

      if (data !== 'content') {
        info = data
      } else {
        info = el.innerHTML
      }

      content[key] = info
    }

    // eslint-disable-next-line
    for (const key in popupEls) {
      const el = popupEls[key]
      const info = content[key]
      if (!el || !info) return

      if (key !== 'img') {
        el.innerHTML = info
      } else {
        el.src = info
      }
    }
  }

  removeContent() {
    const popupEls = this.infoPopupEls

    // eslint-disable-next-line
    for (const key in popupEls) {
      const el = popupEls[key]
      if (!el) return
      if (key !== 'img') {
        el.innerHTML = ''
      } else {
        el.src = ''
      }
    }
  }

  onOpen() {
    if (this.name === 'info') this.addContent()
  }

  onClose() {
    if (this.name === 'info') this.removeContent()
  }
}
