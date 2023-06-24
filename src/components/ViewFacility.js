import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CListGroupItem,
  CListGroup,
  CCarousel,
  CCarouselItem,
  CImage,
  CCol,
  CButton,
  CBadge,
  CAlert,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CForm,
  CFormInput,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import tennis from '../assets/images/tennis.jpg'
import badminton from '../assets/images/badminton.jpg'
import AuthService from 'src/services/AuthService'
import axios from 'axios'
import { backendURL } from 'src/app.constants'
import MapBox from './MapBox'
import CustomCalendar from './CustomCalendar'
import moment from 'moment'
import CIcon from '@coreui/icons-react'
import { cilArrowThickFromTop, cilX } from '@coreui/icons'
import mpesa from '../assets/images/mpesa.png'

function ViewFacility({ facility, user }) {
  const [formData, setFormData] = useState({
    _id: facility?._id ? facility._id : '',
    name: facility?.name ? facility.name : '',
    capacity: facility?.capacity ? facility.capacity : 0,
    location: facility?.location ? facility.location : '',
    type: facility?.type ? facility.type : '',
    description: facility?.description ? facility.description : '',
    file: null,
  })
  const [validated, setValidated] = useState(false)
  const [response, setResponse] = useState({ success: '', error: '' })
  const [startDate, setStartDate] = useState(new Date())
  const [calendarData, setCalendarData] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [viewMap, setViewMap] = useState(false)
  const [clearCalendar, setClearCalendar] = useState(false)
  const [pay, setPay] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [events, setEvents] = useState([])
  const options = AuthService.setHeaders()

  const processPayment = () => {
    axios
      .post(
        backendURL + '/mpesa/processrequest',
        { phoneNumber: phoneNumber, amount: subTotal },
        options,
      )
      .then((response) => {
        console.log(response.data)
        addBooking()
      })
      .catch((error) => console.log(error))
  }

  const addBooking = () => {
    axios
      .post(
        backendURL + '/bookings',
        { dates: calendarData, subTotal, facility: facility._id },
        options,
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => console.log(error))
  }

  const handleCalendarData = (data) => {
    setCalendarData(data)
    const subTotal = facility.cost * data.length
    setSubTotal(subTotal)
  }

  const resetCalendar = () => {
    setClearCalendar(false)
  }

  useEffect(() => {
    axios
      .get(backendURL + `/bookings/facility/${facility._id}`, options)
      .then((response) => {
        const data = response.data.map((item) => item.dates).flat()
        console.log(data)
        setEvents(data)
      })
      .catch((error) => console.log(error.response.data.message))
  })

  return (
    <div className="row">
      {response.error && (
        <CAlert color="danger" dismissible onClose={() => setResponse({ error: '' })}>
          {response.error}
        </CAlert>
      )}
      <CModal
        visible={pay ? true : false}
        onClose={() => setPay(false)}
        size="lg"
        backdrop="static"
      >
        <CModalHeader onClose={() => setPay(false)}>
          <CModalTitle>PAYMENT</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard>
            <CCardBody>
              <h3>Pay with</h3>
              <img src={mpesa} alt="" style={{ width: '100px' }} />
              <p>AMOUNT: {subTotal}</p>
              <CForm className="row g-3 needs-validation" noValidate validated={validated}>
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    id="name"
                    label="Enter Phone Number (KE)"
                    feedbackValid="Looks good!"
                    feedbackInvalid="Please provide a name"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" onClick={processPayment}>
                    Send
                  </CButton>
                </CCol>
                <CCol xs={12} className="d-flex justify-content-center my-5">
                  <CButton color="primary" onClick={processPayment}>
                    Confirm Payment
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
      <div className="col-8">
        <CCard>
          <CCarousel controls dark indicators interval={10000}>
            <CCarouselItem>
              <CImage className="d-block w-100" src={tennis} alt="slide 1" />
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src={badminton} alt="slide 2" />
            </CCarouselItem>
          </CCarousel>
          <CCardBody>
            <CCardTitle>{facility.name}</CCardTitle>
          </CCardBody>
          <CListGroup flush>
            <CListGroupItem style={{ fontSize: '13px' }}>
              {facility.description ? facility.description : 'Description - '}
            </CListGroupItem>
            <CListGroupItem>
              Capacity:
              <span style={{ fontWeight: 500 }}> {facility.capacity} </span>
            </CListGroupItem>
            <CListGroupItem>
              Type: <span style={{ fontWeight: 500 }}> {facility.type} </span>
            </CListGroupItem>
            <CListGroupItem>
              Location: <span style={{ fontWeight: 500 }}> {facility.location} </span>
            </CListGroupItem>
            <CListGroupItem>
              Cost:{' '}
              <span style={{ fontWeight: 500 }}>
                {facility.currency} {facility.cost} per hour
              </span>
            </CListGroupItem>
          </CListGroup>
          <h6
            style={{ cursor: 'pointer' }}
            onClick={() => setViewMap(true)}
            className="text-left m-3 d-flex justify-content-between"
          >
            View on map <CIcon icon={cilArrowThickFromTop} />
          </h6>
          {viewMap && <MapBox markers={facility.coordinates} />}
        </CCard>

        <div className="mt-5">
          <h5>{user ? 'Calendar' : 'Book Now'}</h5>
          <CCol xs={6} className="my-3">
            {!user && <h6>Pick times</h6>}
            <div className="d-flex my-3">
              <div className="d-flex">
                <h5>AVAILABLE:</h5>
                <div
                  style={{
                    border: '2px solid lavender',
                    borderRadius: '5px',
                    width: '45px',
                    height: '30px',
                    marginLeft: '10px',
                  }}
                ></div>
              </div>
              <div className="d-flex mx-5">
                <h5>BOOKED:</h5>
                <div
                  style={{
                    border: '2px solid lavender',
                    borderRadius: '5px',
                    width: '45px',
                    height: '30px',
                    marginLeft: '10px',
                    backgroundColor: '#d3d3d3',
                  }}
                ></div>
              </div>
            </div>
            <CustomCalendar
              calendarData={handleCalendarData}
              clearCalendar={clearCalendar}
              resetCalendar={resetCalendar}
              events={events}
            />
          </CCol>
        </div>
      </div>

      {/* DETAILS SIDEBAR */}
      {!user && (
        <div
          className="position-fixed end-0 px-4"
          style={{ backgroundColor: '#F2F3F5', width: '370px', height: '100%', top: '120px' }}
        >
          <h4 className="my-4">Booking Details</h4>
          <p className="my-4" style={{ fontSize: '20px' }}>
            SubTotal: {facility.currency} <span style={{ fontWeight: 500 }}> {subTotal} </span>
          </p>
          <div className="border-primary" style={{ width: '100%', borderTop: '3px solid' }}></div>
          <div className="mt-4 d-flex justify-content-between">
            <CButton
              color="primary"
              style={{ width: '100px' }}
              disabled={calendarData.length > 0 ? false : true}
              onClick={() => setPay(true)}
            >
              PAY
            </CButton>
            <CButton
              color="danger"
              size="sm"
              style={{ width: '80px' }}
              onClick={() => {
                setClearCalendar(true)
                setSubTotal(0)
                setPay(false)
              }}
            >
              <CIcon icon={cilX} />
            </CButton>
          </div>
          <h5 className="mt-5">Chosen dates :</h5>
          {calendarData.length > 0 &&
            calendarData.map((data, index) => {
              const start = moment(data.start).format('MMMM Do YYYY, h:mm:ss a')
              const end = moment(data.end).format('MMMM Do YYYY, h:mm:ss a')
              return (
                <CBadge className="p-2 mb-2" key={index} color="primary">
                  {start} - {end}
                </CBadge>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default ViewFacility
