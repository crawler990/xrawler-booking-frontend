import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem('token') ? true : false

  return <Route element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />} />
}

export default PrivateRoute
