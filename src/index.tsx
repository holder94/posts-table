import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/:page' element={<App />} />
        <Route path='/*' element={<Navigate to='/1' replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
