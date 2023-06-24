import React, { useState } from 'react'
import { CAlert, CButton, CCol, CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'
import axios from 'axios'
import { backendURL } from '../app.constants'
import AuthService from 'src/services/AuthService'
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react'
import { currencies } from 'src/assets/curencies'

const facilities = ['...', 'Football', 'Basketball', 'Tennis', 'Swimming', 'Badminton', 'Cricket']

function AddFacility({ facility }) {
  const [formData, setFormData] = useState({
    _id: facility?._id ? facility._id : '',
    name: facility?.name ? facility.name : '',
    capacity: facility?.capacity ? facility.capacity : 0,
    type: facility?.type ? facility.type : '',
    cost: facility?.cost ? facility.cost : '',
    currency: facility?.currency ? facility.currency : '',
    location: facility?.location ? facility.location : '',
    coordinates: facility?.coordinates ? facility.coordinates : '',
    description: facility?.description ? facility.description : '',
    file: null,
    parentId: null,
  })
  const [validated, setValidated] = useState(false)
  const [response, setResponse] = useState({ success: '', error: '' })
  const options = AuthService.setHeaders()

  const addFacility = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === true) {
      const [latitude, longitude] = formData.coordinates.split(',').map(parseFloat)
      formData.coordinates = { latitude, longitude }
      axios
        .post(backendURL + '/facilities', formData, options)
        .then((response) => {
          console.log(response)
          const token = localStorage.getItem('token')
          const sendData = new FormData()
          const file = {
            file: formData.file,
            parentId: response._id,
          }
          sendData.append('file', file.file)
          sendData.append('parentId', response.data._id)

          console.log(sendData)

          setResponse({ success: 'Successfully added new facility', error: '' })

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

          setFormData((prevdata) => ({
            ...prevdata,
            name: '',
            capacity: 0,
            location: '',
            type: '',
            description: '',
          }))
        })
        .catch((error) => setResponse({ success: '', error: error.response.data.message }))
    }
    setValidated(true)
  }

  const editFacility = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === true) {
      axios
        .post(backendURL + `/facilities/${formData._id}`, formData, options)
        .then(() => setResponse({ success: 'Successfully updated facility', error: '' }))
        .catch((error) => setResponse({ success: '', error: error.response.data.message }))
    }
    setValidated(true)
  }

  return (
    <>
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
      <h2> {facility ? 'Edit' : 'Add'} Facility</h2>

      <CForm className="row g-3 needs-validation" noValidate validated={validated}>
        <CCol md={12}>
          <CFormInput
            type="text"
            id="name"
            label="Name"
            feedbackValid="Looks good!"
            feedbackInvalid="Please provide a name"
            required
            onChange={(e) => setFormData((prevdata) => ({ ...prevdata, name: e.target.value }))}
            value={formData.name}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="number"
            id="capacity"
            label="Capacity"
            required
            feedbackValid="Looks good!"
            feedbackInvalid="Please provide a value"
            onChange={(e) => setFormData((prevdata) => ({ ...prevdata, capacity: e.target.value }))}
            value={formData.capacity}
          />
        </CCol>
        <CCol xs={3}>
          <CFormSelect
            id="facility"
            label="Facility type"
            required
            feedbackValid="Looks good!"
            feedbackInvalid="Please select a related facility type"
            onChange={(e) => setFormData((prevdata) => ({ ...prevdata, type: e.target.value }))}
            value={formData.type}
          >
            {facilities.map((facility) => {
              return <option key={facility}>{facility}</option>
            })}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="number"
            id="cost"
            label="Unit Cost Per Hour"
            required
            feedbackValid="Looks good!"
            feedbackInvalid="Please provide a value"
            onChange={(e) => setFormData((prevdata) => ({ ...prevdata, cost: e.target.value }))}
            value={formData.cost}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="text"
            id="currency"
            label="Currency"
            required
            feedbackValid="Looks good!"
            feedbackInvalid="Please provide a value"
            onChange={(e) => setFormData((prevdata) => ({ ...prevdata, currency: e.target.value }))}
            value={formData.currency}
          />
        </CCol>
        <CCol xs={4}>
          <AddressAutofill accessToken="pk.eyJ1Ijoic292aWV0dXNlciIsImEiOiJjbGlvNzJraW4wNXByM2xsYnpqcGZuemZiIn0.a2s7Q8KIm-bomF07QpweGA">
            <CFormInput
              id="location"
              label="Location"
              required
              feedbackValid="Looks good!"
              feedbackInvalid="Please provide a location"
              onChange={(e) =>
                setFormData((prevdata) => ({ ...prevdata, location: e.target.value }))
              }
              value={formData.location}
              autoComplete="address-level1"
            />
          </AddressAutofill>
        </CCol>
        <CCol xs={4}>
          <CFormInput
            id="coordinates"
            label="Coordinates (longitude, latitude)"
            feedbackValid="Looks good!"
            feedbackInvalid="Please provide a location"
            onChange={(e) => {
              setFormData((prevdata) => ({ ...prevdata, coordinates: e.target.value }))
            }}
            value={formData.coordinates}
          />
        </CCol>
        <CCol xs={12}>
          <CFormTextarea
            id="textarea"
            label="Description"
            rows={3}
            text="max 100 words"
            onChange={(e) =>
              setFormData((prevdata) => ({ ...prevdata, description: e.target.value }))
            }
            value={formData.description}
          ></CFormTextarea>
        </CCol>
        <CCol xs={6}>
          <CFormInput
            type="file"
            id="file"
            label="Images"
            multiple
            onChange={(e) => setFormData((prevdata) => ({ ...prevdata, file: e.target.files[0] }))}
          />
        </CCol>
        <CCol xs={12}>
          {facility?.name ? (
            <CButton onClick={editFacility}>{facility?.name && 'Save'}</CButton>
          ) : (
            <CButton onClick={addFacility}>{!facility?.name && 'Add'}</CButton>
          )}
        </CCol>
      </CForm>
    </>
  )
}

export default AddFacility
