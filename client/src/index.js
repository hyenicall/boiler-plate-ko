import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import proiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers'

const createStoreWithMiddleware = applyMiddleware(
  proiseMiddleware,
  ReduxThunk
)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
