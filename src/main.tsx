import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 初始化大字模式
const savedScale = localStorage.getItem('ui-scale')
if (savedScale && parseFloat(savedScale) > 1) {
  document.documentElement.classList.add('large-mode')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
