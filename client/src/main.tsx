import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import "./global.css"
import { QueryProvider } from './lib/react-query/QueryProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider >

  </React.StrictMode>,
)
