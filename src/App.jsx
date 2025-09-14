import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ContractDetail from './pages/ContractDetail'
import { useAuth } from './context/AuthContext'

export default function App(){
  const { token } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={ token ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/contracts/:id" element={ token ? <ContractDetail /> : <Navigate to="/login" replace/> } />
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
    </Routes>
  )
}
