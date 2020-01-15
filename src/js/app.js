import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'core-js/features/object/values'
import 'intersection-observer'
import './lib/polyfill'
import smoothscroll from 'smoothscroll-polyfill'
import 'whatwg-fetch'

import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import toggleHeader from './components/Header/Header'
import scrollTo from './components/scrollTo'
import setTextareaHeight from './components/Textarea/Textarea'
import setSelects from './components/Select/Select'
import addPersonRegistration from './components/addPersonRegistration'
import setGallery from './components/Gallery/Gallery'
import setInputNmber from './components/setInputNmber'

import classNames from './classNames'

import Tabs from './components/Tabs/Tabs'
import Slider from './components/Slider/Slider'
import Accordion from './components/Accordion/Accordion'
import Menu from './components/Menu/Menu'
import Popup from './components/Popup/Popup'

import { NO_SCROLL } from './constants'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    this.dom = {
      body: document.body,
      header: document.querySelector(`.${classNames.header}`),
      scrollTo: {
        sections: [...document.querySelectorAll(`.${classNames.scrollTo.section}`)],
        btns: [...document.querySelectorAll(`.${classNames.scrollTo.btn}`)],
      },
    }
    this.state = {
      hasMenuOpen: false,
    }

    this.tabs = new Tabs({
      classNames: {
        btn: 'program__tab',
        item: 'program__item',
      },
    })
    this.slider = new Slider(`.${classNames.slider.container}`)
    this.accordion = new Accordion({
      classNames: {
        btn: 'question__btn',
        item: 'question__content',
      },
    })
    this.menu = new Menu({
      classNames: {
        btn: 'burger',
        menu: 'header__nav',
      },
    })
    this.menu.onToggle = this.onMenuToggle.bind(this)
    this.menu.onClose = this.onMenuClose.bind(this)
    this.popup = new Popup()
  }

  updateState(state) {
    this.state = {
      ...this.state,
      ...state,
    }
  }

  initMethods() {
    this.methods = {
      sayHello,
      setHTMLClassNames,
      setLazy,
      toggleHeader,
      scrollTo,
      setTextareaHeight,
      setSelects,
      addPersonRegistration,
      setGallery,
      setInputNmber,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  init() {
    smoothscroll.polyfill()
    this.initMethods()

    this.tabs.init()
    this.slider.init()
    this.accordion.init()
    this.menu.init()
    this.popup.init()
  }

  onMenuToggle() {
    let { hasMenuOpen } = this.state
    hasMenuOpen = !hasMenuOpen
    this.updateState({ hasMenuOpen })

    App.toggleScroll(this, this.state.hasMenuOpen)
  }

  onMenuClose() {
    this.updateState({ hasMenuOpen: false })
    App.toggleScroll(this, this.state.hasMenuOpen)
  }

  static preventScroll(app) {
    app.dom.body.classList.add(NO_SCROLL)
  }

  static allowScroll(app) {
    app.dom.body.classList.remove(NO_SCROLL)
  }

  static toggleScroll(app, condition) {
    if (condition) {
      App.preventScroll(app)
    } else {
      App.allowScroll(app)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  window.app = app
})
