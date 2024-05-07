import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { App } from '@/app/App'
import { store } from '@/servies/store'
import { ThemeProvider } from '@gravity-ui/uikit'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
