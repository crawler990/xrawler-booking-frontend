import React from 'react'

const Dashboard = React.lazy(() => import('./components/Dashboard'))
const AddFacility = React.lazy(() => import('./components/AddFacility'))
const UserFacilities = React.lazy(() => import('./components/UserFacilities'))
const AddBooking = React.lazy(() => import('./components/AddBooking'))
const Bookings = React.lazy(() => import('./components/Bookings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/facilities/new', name: 'Facilities', element: AddFacility },
  { path: '/facilities/user', name: 'User Facilities', element: UserFacilities },
  { path: '/bookings/new', name: 'Bookings', element: AddBooking },
  { path: '/bookings/user', name: 'Bookings', element: Bookings },
]

export default routes
