import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import BackButton from './BackButton'
import avatar8 from '../assets/images/avatar8.png'
import { getFileData } from './ViewFacility'
import { backendURL } from 'src/app.constants'
import AuthService from 'src/services/AuthService'
import axios from 'axios'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()
  const [profilePhoto, setProfilePhoto] = useState()
  const options = AuthService.setHeaders()

  useEffect(() => {
    axios
      .get(backendURL + '/profilephoto', options)
      .then((response) => {
        setProfilePhoto(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <BackButton />
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
          <CNavItem className="mx-3">
            <CAvatar
              src={
                profilePhoto
                  ? `data:${profilePhoto.contentType};base64,${getFileData(profilePhoto.data.data)}`
                  : avatar8
              }
              size="md"
              style={{
                cursor: 'pointer',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              onClick={() => navigate('/user/profile')}
            />
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon
                icon={cilAccountLogout}
                size="lg"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.removeItem('token')
                  navigate('/login')
                }}
              />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
