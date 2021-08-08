import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'macro-css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)