import SliderPlugin from './SliderPlugin'
import classes from '../../classNames'

const classNames = classes.slider

export default class Slider {
  constructor(slider) {
    this.sliderClass = slider
    this.sliders = []
  }

  _getOptions() {
    this.getOptions = ({ navigation, onInit }) => ({
      speakers: {
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 20,
        navigation,
        on: {
          init: onInit,
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 4,
          },
        },
      },
      sponsors: {
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 20,
        navigation,
        on: {
          init: onInit,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
      gallery: {
        navigation,
        centeredSlides: true,
        slidesPerView: 3,
        // loop: true,
        grabCursor: true,
        on: {
          init: onInit,
        },
      },
    })
  }

  _initSliders() {
    this.containers.forEach(container => {
      if (container.classList.contains(classNames.plugin.initialized)) return

      const slider = new SliderPlugin(container, this.getOptions)
      slider.init()
      this.sliders = [...this.sliders, slider]
    })
  }

  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)]
    if (!this.containers.length) return

    this._getOptions()
    this._initSliders()
  }
}
