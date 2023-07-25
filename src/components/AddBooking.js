import React, { useEffect, useState } from 'react'
import { CAlert, CButton } from '@coreui/react'
import axios from 'axios'
import { backendURL } from '../app.constants'
import AuthService from 'src/services/AuthService'
import Search from './Search'
import AllFacilities from './AllFacilities'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilBackspace } from '@coreui/icons'

function AddBooking({ booking }) {
  const [formData, setFormData] = useState({
    _id: booking?._id ? booking._id : '',
    type: booking?.type ? booking.type : 'Reservation',
    date: booking?.date ? booking.date : '',
    facility: booking?.facility ? booking.facility : '',
  })
  const [facilities, setFacilities] = useState([])
  const [filteredFacilities, setFilteredFacilities] = useState([])
  const [validated, setValidated] = useState(false)
  const [response, setResponse] = useState({ success: '', error: '' })
  const [search, setSearch] = useState(true)
  const options = AuthService.setHeaders()

  useEffect(() => {
    axios
      .get(backendURL + '/facilities', options)
      .then((response) => {
        setFacilities(response.data)
      })
      .catch((error) => setResponse({ success: '', error: error.response.data.message }))
  }, [])

  const viewFacility = () => {
    setSearch(false)
  }

  const handleResults = (results) => {
    setFilteredFacilities(results)
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

      <div className="d-flex">
        <h3 className="mb-3"> {booking ? 'Edit' : 'New'} booking</h3>
        {/* {!search && (
          <CButton
            style={{ width: '80px', height: '35px', marginLeft: '600px' }}
            onClick={() => {
              setSearch((search) => !search)
            }}
          >
            <CIcon icon={cilArrowLeft} />
          </CButton>
        )} */}
      </div>
      {search && <Search values={facilities} results={handleResults} />}
      <AllFacilities
        facilities={facilities}
        filteredFacilities={filteredFacilities}
        viewFacility={viewFacility}
      />
    </>
  )
}

export default AddBooking
