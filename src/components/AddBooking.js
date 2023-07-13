import React, { useEffect, useState } from 'react'
import { CAlert } from '@coreui/react'
import axios from 'axios'
import { backendURL } from '../app.constants'
import AuthService from 'src/services/AuthService'
import Search from './Search'
import AllFacilities from './AllFacilities'

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
  const [startDate, setStartDate] = useState(new Date())
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

      <h2 className="mb-3"> {booking ? 'Edit' : 'New'} booking</h2>
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
