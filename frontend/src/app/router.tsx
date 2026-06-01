import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminApp } from '../admin/AdminApp';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
