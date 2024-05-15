import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { PotionsProvider } from './Providers/PotionsProvider/PotionsProvider.tsx'
import { GameProvider } from './Providers/GameProvider/GameProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PotionsProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </PotionsProvider>
  </React.StrictMode>,
)
