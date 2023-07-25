import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CListGroup,
  CListGroupItem,
  CCard,
} from '@coreui/react'
import { backendURL } from 'src/app.constants'
import axios from 'axios'
import AuthService from 'src/services/AuthService'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilTrash } from '@coreui/icons'
import moment from 'moment'

function Bookings() {
  const [bookings, setBookings] = useState([])
  const options = AuthService.setHeaders()

  useEffect(() => {
    axios
      .get(backendURL + '/bookings/user', options)
      .then((response) => {
        console.log(response.data)
        setBookings(response.data)
      }, [])
      .catch()
  }, [])

  // const handleDelete = (id) => {
  //   axios
  //     .delete(backendURL + `/bookings/${id}`, options)
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  //     .catch()
  // }

  return (
    <>
      <CCard>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Facility</CTableHeaderCell>
              <CTableHeaderCell scope="col">Times</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total Cost</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                return (
                  <CTableRow key={booking._id}>
                    <CTableHeaderCell scope="row">{booking.facility.name}</CTableHeaderCell>
                    <CTableDataCell>
                      <CListGroup style={{ width: '100px' }}>
                        {booking.dates.map((date) => {
                          return (
                            <CListGroupItem key={date.start}>
                              {moment(date.start).format('MMMM Do YYYY, h:mm:ss a')} - {''}
                              {moment(date.end).format('MMMM Do YYYY, h:mm:ss a')}
                            </CListGroupItem>
                          )
                        })}
                      </CListGroup>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{booking.subTotal}</strong>
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            ) : (
              <CTableRow className="d-flex justify-start">
                <h5>No Bookings Available</h5>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}

export default Bookings
