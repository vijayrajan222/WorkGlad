import React from 'react'
import { Toaster } from 'react-hot-toast'
import LoginLanding from './pages/LoginLanding'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import Leave from './pages/Leave'
import Payslips from './pages/Payslips'
import PrintPaySlip from './pages/PrintPaySlip'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout  from './pages/Layout'
import Settings from './pages/Settings'
import LoginForm from './components/LoginForm'
import { ProtectedRoute, PublicOnlyRoute } from './components/AuthRoute'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<PublicOnlyRoute><LoginLanding/></PublicOnlyRoute>} />
        <Route path="/login/admin" element={<PublicOnlyRoute><LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organisation"/></PublicOnlyRoute>} />
        <Route path="/login/employee" element={<PublicOnlyRoute><LoginForm role="Employee" title="Employee portal" subtitle="Sign in to access"/></PublicOnlyRoute>} />
        <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/Payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings/>} />
        </Route>
        <Route path="/print/payslip/:id" element={<ProtectedRoute><PrintPaySlip /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace/>} />
      </Routes >
    </>
  )
}

export default App
