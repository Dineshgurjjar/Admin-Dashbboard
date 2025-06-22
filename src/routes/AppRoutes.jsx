// File: src/routes/AppRoutes.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Calendar from '../pages/Calendar'
import Kanban from '../pages/Kanban'
import Reports from '../pages/Reports'
import Products from '../pages/Products'
import Categories from '../pages/Categories'
import Customer from '../pages/Customer'
import Inventory from '../pages/Inventory'
import Setting from '../components/Setting'
import AlertsPage from '../pages/AlertsPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/kanban" element={<Kanban />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/products" element={<Products/>} />
      <Route path="/categories" element={<Categories/>} />
      <Route path="/customers" element={<Customer/>} />
      <Route path="/inventory" element={<Inventory/>} />
      <Route path="/settings" element={<Setting/>} />
      <Route path="/alerts" element={<AlertsPage/>} />
      {/* Optional: Add a fallback route */}
      <Route path="*" element={<div className="p-6 text-center text-red-500">404 - Page Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes
