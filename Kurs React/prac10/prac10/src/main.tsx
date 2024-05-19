import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DataProvider } from './Providers/DataProvider/DataProvider.tsx'
import { GameProvider } from './Providers/GameProvider/GameProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider dataKind='potions'>
      <GameProvider>
        <App />
      </GameProvider>
    </DataProvider >
  </React.StrictMode>,
)
