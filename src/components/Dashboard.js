import React from 'react'
import {
  CCard,
  CCarousel,
  CCarouselItem,
  CImage,
  CCol,
  CWidgetStatsE,
  CDropdownMenu,
  CDropdownItem,
  CRow,
  CDropdown,
  CDropdownToggle,
  CLink,
} from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilArrowTop, cilArrowRight, cilChartPie } from '@coreui/icons'
import swimming from '../assets/images/swimming.jpg'
import tennis from '../assets/images/tennis.jpg'
import badminton from '../assets/images/badminton.jpg'
import bg1 from '../assets/images/bg1.jpg'
import bg2 from '../assets/images/bg2.jpg'
import '../css/Dashboard.css'

const Dashboard = () => {
  return (
    <>
      <div className="carousel">
        <CCarousel controls indicators dark interval={7000}>
          <CCarouselItem>
            <CImage className="d-block w-100" src={tennis} alt="slide 1" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={swimming} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={badminton} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={bg1} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={bg2} alt="slide 2" />
          </CCarouselItem>
        </CCarousel>
      </div>
      <CCard className="mt-5">
        <CRow>
          <CCol xs={3}>
            <CWidgetStatsE className="m-3" title="Widget title" value="89.9%" />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsE className="m-3" title="Widget title" value="89.9%" />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsE className="m-3" title="Widget title" value="89.9%" />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsE className="m-3" title="Widget title" value="89.9%" />
          </CCol>
        </CRow>
      </CCard>
    </>
  )
}

export default Dashboard
