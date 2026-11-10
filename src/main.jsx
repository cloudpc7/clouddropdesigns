import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './styles/main.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.jsx';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.jsx'
import './firebaseConfig.js'

hydrateRoot(
  document.getElementById('root'),
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
