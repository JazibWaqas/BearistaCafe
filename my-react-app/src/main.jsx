import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/commonStyles.css'
import './styles/home.css'
import './styles/review.css'
import './styles/faq.css'
import './styles/diy.css'
import './styles/account.css'
import './styles/login.css'
import './styles/shoppingCart.css'
import './styles/menu.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
