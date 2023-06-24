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
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import tennis from '../assets/images/tennis.jpg'
import badminton from '../assets/images/badminton.jpg'
import ViewFacility from './ViewFacility'

function AllFacilities({ facilities, filteredFacilities, viewFacility }) {
  const [value, showFacilityDetails] = useState(false)

  const view = (facility) => {
    return (
      <CCard
        style={{ width: '20rem', cursor: 'pointer' }}
        className="col-3 m-2"
        key={facility._id}
        onClick={() => {
          showFacilityDetails(facility)
          viewFacility()
        }}
      >
        <CCarousel controls dark interval={10000}>
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
