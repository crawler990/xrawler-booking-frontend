import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CListGroupItem,
  CListGroup,
  CCarousel,
  CCarouselItem,
  CImage,
  CButton,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import arena1 from '../assets/images/arena1.jpg'
import ViewFacility from './ViewFacility'

function AllFacilities({ facilities, filteredFacilities, viewFacility }) {
  const [value, showFacilityDetails] = useState(false)

  const view = (facility) => {
    return (
      <CCard style={{ width: '20rem' }} className="col-3 m-2" key={facility._id}>
        <CImage className="d-block w-100" src={arena1} alt="slide 2" />
        <CCardBody>
          <div className="d-flex justify-content-between">
            <CCardTitle>{facility.name}</CCardTitle>
            <CButton
              color="primary"
              size="sm"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                showFacilityDetails(facility)
                viewFacility()
              }}
            >
              View
            </CButton>
          </div>
        </CCardBody>
        <CListGroup flush>
          <CListGroupItem style={{ fontSize: '13px' }}>
            {facility.description ? facility.description.slice(0, 200) + '...' : 'Description - '}
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
        </CListGroup>
      </CCard>
    )
  }

  return (
    <>
      {!value ? (
        <div className="row mx-5">
          {filteredFacilities.length > 0
            ? filteredFacilities.map((facility) => {
                return view(facility)
              })
            : facilities.length > 0 &&
              facilities.map((facility) => {
                return view(facility)
              })}
        </div>
      ) : (
        <ViewFacility facility={value} user={false} />
      )}
    </>
  )
}

export default AllFacilities
