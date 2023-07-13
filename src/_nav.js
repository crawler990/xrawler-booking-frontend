import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBook,
  cilHome,
  cilHouse,
  cilInput,
  cilStar,
  cilAccountLogout,
  cilClock,
} from '@coreui/icons'
import { CNavItem, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Bookings',
    to: '/bookings/user',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Book Now',
        to: '/bookings/new',
        icon: <CIcon icon={cilInput} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'My Past Bookings',
        to: '/bookings/user',
        icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Facilities',
    to: '/facilities',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Facility',
        to: '/facilities/new',
        icon: <CIcon icon={cilInput} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'My Facilities',
        to: '/facilities/user',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
