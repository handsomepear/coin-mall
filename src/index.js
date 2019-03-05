import React from 'react'
import ReactDOM from 'react-dom'

import 'lib-flexible'
import '@common/styles/reset.css'
import '@common/styles/common.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'

import '@common/js/bridge'

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  )
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
