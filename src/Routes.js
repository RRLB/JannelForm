// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import FormEnterprise from './FormEnterprise';
import FormClient from './FormClient';
// import CreatePDF from './CreatePDF';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/formEnterprise" element={<FormEnterprise />} />
      <Route path="/formClient" element={<FormClient />} />
      {/* <Route path="/createPDF" element={<CreatePDF />} /> */}
    </Routes>
  );
}

export default AppRoutes;