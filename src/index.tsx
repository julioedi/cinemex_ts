import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalsList } from './constants/GlobalsList';
const root = ReactDOM.createRoot(GlobalsList.Dom);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
