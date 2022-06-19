import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import RootWrapper from './components/rootWrapper'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RootWrapper>
      <App />
    </RootWrapper>
  </React.StrictMode>
)
