import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './components/Clock';
import './index.css'

const root=ReactDOM.createRoot(document.getElementById("timer"));
root.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>,
)
