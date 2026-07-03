import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.jsx';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
