import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'
import AuthService from 'src/services/AuthService'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  path={route.path}
                  exact={route.exact}
                  key={idx}
                  name={route.name}
                  element={
                    AuthService.validateToken() ? (
                      <route.element />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              )
            )
          })}
          <Route
            path="/"
            element={
              AuthService.validateToken() ? (
                <Navigate to="dashboard" replace />
              ) : (
                <Navigate to="login" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
