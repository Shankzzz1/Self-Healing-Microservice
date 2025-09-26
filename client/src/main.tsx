import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!

// Show a lightweight global loader for initial mount
const loader = document.createElement('div')
loader.className = 'app-loader-overlay'
loader.innerHTML = '<div style="display:flex;gap:8px"><span class="app-loader-dot"></span><span class="app-loader-dot"></span><span class="app-loader-dot"></span></div>'
document.body.appendChild(loader)

const root = createRoot(rootEl)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Remove loader after first paint
requestAnimationFrame(() => {
  setTimeout(() => {
    if (document.body.contains(loader)) document.body.removeChild(loader)
  }, 400)
})
