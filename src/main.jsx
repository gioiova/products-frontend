import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from "react-router-dom";
import StoreProvider from "./utils/StoreProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HashRouter>
          <StoreProvider>
            <App />
          </StoreProvider>
      </HashRouter>
  </React.StrictMode>
)
