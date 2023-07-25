import React from 'react'
import {
  CCard,
  CCarousel,
  CCarouselItem,
  CImage,
  CCol,
  CRow,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import bg1 from '../assets/images/bg1.jpg'
import bg2 from '../assets/images/bg2.jpg'
import '../css/Dashboard.css'
import axios from 'axios'
import { backendURL } from 'src/app.constants'
import AuthService from 'src/services/AuthService'

const Dashboard = () => {
  const options = AuthService.setHeaders()

  const generateReport = () => {
    axios
      .get(backendURL + '/reports', options)
      .then((response) => {
        const uint8Array = new Uint8Array(response.data.data)

        const blob = new Blob([uint8Array], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'report'
        link.click()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="carousel" style={{ height: '100vh' }}>
        <CCarousel controls indicators dark interval={7000}>
          <CCarouselItem>
            <CImage className="d-block w-100" src={bg1} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={bg2} alt="slide 2" />
          </CCarouselItem>
        </CCarousel>
      </div>
      <CRow>
        {/* <CCard className="mt-5">
          <CCol xs={4}>
            <CWidgetStatsE className="m-3" title="FACILITIES" value="89.9%" />
          </CCol>
          <CCol xs={4}>
            <CWidgetStatsE className="m-3" title="BOOKINGS" value="89.9%" />
          </CCol>
          <CCol xs={4}>
            <CWidgetStatsE className="m-3" title="PAYMENTS" value="89.9%" />
          </CCol>
        </CCard> */}

        <CCol xs={12}>
          <CCard className="my-3">
            <CCardHeader>Bookings</CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'Bookings',
                      backgroundColor: '#f87979',
                      data: [0, 0, 5, 12, 10, 40, 9, 0, 0],
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12}>
          <CCard className="my-3">
            <CCardHeader>Payments</CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'Payments',
                      backgroundColor: '#f87979',
                      data: [0, 0, 5, 12, 10, 40, 9, 0, 0],
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12}>
          <CCard>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                  <CTableHeaderCell>Usage</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                  <CTableHeaderCell>Activity</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* {tableExample.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.user.name}</div>
                    <div className="small text-medium-emphasis">
                      <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                      {item.user.registered}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <strong>{item.usage.value}%</strong>
                      </div>
                      <div className="float-end">
                        <small className="text-medium-emphasis">{item.usage.period}</small>
                      </div>
                    </div>
                    <CProgress thin color={item.usage.color} value={item.usage.value} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.payment.icon} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">Last login</div>
                    <strong>{item.activity}</strong>
                  </CTableDataCell>
                </CTableRow>
              ))} */}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>

        <CCol xs={12} className="my-3">
          <CButton onClick={generateReport}>Generate Report</CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
