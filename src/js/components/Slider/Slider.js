import MySlider from './MySlider'
import classes from '../../classNames'

const classNames = classes.slider

export default class Slider {
  constructor(slider, app) {
    this.app = app
    this.sliderClass = slider
    this.sliders = []
  }

  _getOptions() {
    this.getOptions = ({ navigation, onInit }) => ({
      speakers: {
        slidesPerView: 4,
        grabCursor: true,
        spaceBetween: 30,
        navigation,
        on: {
          init: onInit,
        },
      },
      sponsors: {
        slidesPerView: 3,
        grabCursor: true,
        spaceBetween: 30,
        navigation,
        on: {
          init: onInit,
        },
      },
      gallery: {
        navigation,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        grabCursor: true,
        // breakpoints: {
        //   768: {
        //     slidesPerView: 1,
        //     centeredSlides: false,
        //   },
        // },
        on: {
          init: onInit,
        },
      },
    })
  }

  _initSliders() {
    this.containers.forEach(container => {
      if (container.classList.contains(classNames.plugin.initialized)) return

      const slider = new MySlider(container, this.getOptions)
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
