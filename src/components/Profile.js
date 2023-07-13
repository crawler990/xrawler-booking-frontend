import { CAlert, CAvatar, CButton, CCol, CForm, CFormInput, CImage, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL } from 'src/app.constants'
import AuthService from 'src/services/AuthService'
import avatar8 from '../assets/images/avatar8.png'
import moment from 'moment'
import CIcon from '@coreui/icons-react'
import { cilPen, cilX } from '@coreui/icons'
import { getFileData } from './ViewFacility'

function Profile() {
  const options = AuthService.setHeaders()
  const [formData, setFormData] = useState({
    _id: '',
    username: '',
    email: '',
    createdAt: '',
  })
  const [profilePhoto, setProfilePhoto] = useState()
  const [newImage, setImage] = useState()
  const [validated, setValidated] = useState(false)
  const [response, setResponse] = useState({ success: '', error: '' })

  useEffect(() => {
    axios
      .get(backendURL + '/user/profile', options)
      .then((response) => {
        setFormData(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios
      .get(backendURL + '/profilephoto', options)
      .then((response) => {
        console.log(response.data)
        setProfilePhoto(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const saveProfile = () => {
    axios
      .post(backendURL + '/user/profile', formData, options)
      .then(() => {
        const token = localStorage.getItem('token')
        const sendData = new FormData()

        sendData.append('file', newImage)
        sendData.append('parentId', formData._id)

        return axios
          .post(backendURL + '/upload', sendData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log('Image uploaded successfully', response.data)
          })
          .catch((error) => {
            console.error('Image upload failed', error)
          })
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <CRow>
        {response.error && (
          <CAlert color="danger" dismissible onClose={() => setResponse({ error: '' })}>
            {response.error}
          </CAlert>
        )}
        {response.success && (
          <CAlert color="success" dismissible onClose={() => setResponse({ error: '' })}>
            {response.success}
          </CAlert>
        )}
        <CCol md={12} className="d-flex justify-content-between">
          <h2 className="mt-5">Edit Profile</h2>
          <CButton color="danger" className="ml-5" style={{ width: '150px', height: '40px' }}>
            Delete Account
          </CButton>
        </CCol>
        <CCol md={6}>
          <CForm className="row g-3 needs-validation" noValidate validated={validated}>
            <CFormInput
              type="text"
              id="name"
              label="Username"
              feedbackValid="Looks good!"
              feedbackInvalid="Please provide a name"
              required
              onChange={(e) => setFormData((prevdata) => ({ ...prevdata, name: e.target.value }))}
              value={formData.username}
            />
            <CFormInput
              type="text"
              id="email"
              label="Email"
              feedbackValid="Looks good!"
              feedbackInvalid="Please provide a name"
              required
              onChange={(e) => setFormData((prevdata) => ({ ...prevdata, name: e.target.value }))}
              value={formData.email}
            />
            <CFormInput
              type="text"
              id="name"
              label="Date created"
              disabled
              value={moment(formData.createdAt).format('MMMM Do YYYY')}
            />
            <CButton className="mt-5" onClick={saveProfile}>
              Save
            </CButton>
          </CForm>
        </CCol>
        <CCol md={6} className="d-flex justify-content-around align-items-center">
          <CImage
            style={{
              cursor: 'pointer',
              borderRadius: '50%',
              width: '200px',
              height: '200px',
              objectFit: 'cover',
            }}
            className="mx-5"
            src={
              profilePhoto
                ? `data:${profilePhoto.contentType};base64,${getFileData(profilePhoto.data.data)}`
                : avatar8
            }
          />
          <div>
            <CButton color="secondary" className="mx-4">
              <CIcon icon={cilPen} size="lg" />
            </CButton>
            <CButton color="danger">
              <CIcon icon={cilX} size="lg" />
            </CButton>
            <input
              type="file"
              name=""
              id=""
              className="m-3"
              onChange={(e) => {
                console.log(e.target.files[0])
                setImage(e.target.files[0])
              }}
            />
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Profile
