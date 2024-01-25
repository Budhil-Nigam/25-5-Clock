import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './components/Clock';
import './index.css'

ReactDOM.render(document.getElementById("timer"),
  <React.StrictMode>
    <Clock />
  </React.StrictMode>,
)
