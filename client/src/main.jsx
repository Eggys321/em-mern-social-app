import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter as Router } from "react-router-dom";

import 'react-lazy-load-image-component/src/effects/blur.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>


    <UserProvider>


    <App />
    </UserProvider>
    </Router>
  </React.StrictMode>,
)
