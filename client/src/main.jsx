import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext.jsx';

import 'react-lazy-load-image-component/src/effects/blur.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>


    <App />
    </UserProvider>
  </React.StrictMode>,
)
