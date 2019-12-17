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

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames

    this.tabs = new Tabs(this)
    this.slider = new Slider(`.${classNames.slider.container}`, this)
    this.accordion = new Accordion(this)
  }

  initMethods() {
    this.methods.sayHello = sayHello
    this.methods.setHTMLClassNames = setHTMLClassNames
    this.methods.setLazy = setLazy
    this.methods.toggleHeader = toggleHeader
    this.methods.scrollTo = scrollTo

    Object.values(this.methods).forEach(fn => fn())
  }

  init() {
    smoothscroll.polyfill()
    this.initMethods()

    this.tabs.init()
    this.slider.init()
    this.accordion.init()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  window.app = app
})
