import PopupPlugin from 'popup-simple'
import classes from '../../classNames'

const classNames = classes.popup

export default class Popup extends PopupPlugin {
  get infoCard() {
    return this.btn.closest(`.${classNames.info.card}`)
  }

  get btnData() {
    return this.btn.dataset
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

  get infoPopupContentWrap() {
    return this.popup.querySelector(`.${classNames.info.content}`)
  }

  addContent() {
    this.url = this.btn.dataset.popupUrl
    if (!this.url) return

    this.xhr = fetch(this.url)
      .then(responce => responce.text())
      .then(text => {
        if (this.infoPopupContentWrap) this.infoPopupContentWrap.innerHTML = text
      })
  }

  removeContent() {
    if (this.infoPopupContentWrap) this.infoPopupContentWrap.innerHTML = ''
  }

  handleVideoClose() {
    this.video = this.popup.querySelector('video')
    if (!this.video) return

    this.video.pause()
  }

  onOpen() {
    if (this.name === 'info') this.addContent()
  }

  onClose() {
    if (this.name === 'info') this.removeContent()
    if (this.name === 'video') this.handleVideoClose()
  }
}
