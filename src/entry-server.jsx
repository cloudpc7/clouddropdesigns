import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import contentReducer from './redux/slices/contentSlice.js'
import deviceReducer from './redux/slices/deviceSlice.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'

export const render = async (url, content, deviceType = 'desktop') => {
  const { meta, ...sections } = content
  const store = configureStore({
    reducer: { content: contentReducer, device: deviceReducer },
    preloadedState: { content: { status: 'succeeded', error: null, meta: meta ?? null, sections }, device: { type: deviceType } },
  });
  const { prelude } = await prerenderToNodeStream(
    <Provider store={store}>
      <ThemeProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    </Provider>
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return { html, state: store.getState() }
}