import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'core-js/features/object/values'
import 'intersection-observer'
import './lib/polyfill'
import smoothscroll from 'smoothscroll-polyfill'

import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import toggleHeader from './components/Header/Header'
import scrollTo from './components/scrollTo'

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
    }
    this.state = {
      hasMenuOpen: false,
    }

    this.tabs = new Tabs()
    this.slider = new Slider(`.${classNames.slider.container}`)
    this.accordion = new Accordion()
    this.menu = new Menu()
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
    this.methods.sayHello = sayHello
    this.methods.setHTMLClassNames = setHTMLClassNames
    this.methods.setLazy = setLazy
    this.methods.toggleHeader = toggleHeader
    this.methods.scrollTo = scrollTo

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
