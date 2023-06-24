import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendURL } from 'src/app.constants'
import {
  CAlert,
  CCard,
  CCarousel,
  CCarouselItem,
  CImage,
  CCardBody,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import AuthService from 'src/services/AuthService'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPen } from '@coreui/icons'
import AddFacility from './AddFacility'
import tennis from '../assets/images/tennis.jpg'
import badminton from '../assets/images/badminton.jpg'
import AllFacilities from './AllFacilities'
import ViewFacility from './ViewFacility'

function UserFacilities() {
  const [facilities, setFacilities] = useState([])
  const [images, setImages] = useState([])
  const [error, setErrorMessage] = useState()
  const [facilityData, showFacility] = useState()
  const [remove, showDelete] = useState()
  const navigate = useNavigate()
  const options = AuthService.setHeaders()

  useEffect(() => {
    axios
      .get(backendURL + '/facilities/user', options)
      .then((response) => setFacilities(response.data))
      .catch((error) => setErrorMessage(error.response.data.message))
  })

  const handleDelete = () => {
    axios
      .delete(backendURL + `/facilities/${remove._id}`, options)
      .then(() => {
        showDelete('')
        navigate('/facilities/user')
      })
      .catch((error) => setErrorMessage(error.response.data.message))
  }

  return (
    <>
      {error && (
        <CAlert color="danger" dismissible onClose={() => setErrorMessage('')}>
          {error}
        </CAlert>
      )}
      <CModal visible={remove ? true : false} onClose={() => showDelete(false)}>
        <CModalHeader onClose={() => showDelete(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete <span style={{ fontWeight: 500 }}>{remove?.name}</span>?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => showDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      {facilities.length === 0 ? (
        <div className="text-center">
          <h2 className="mb-4">No Facilities available</h2>
          <CButton onClick={() => navigate('/facilities/new')}>Add Facility</CButton>
        </div>
      ) : (
        <div className="row">
          {facilityData ? (
            <>
              <ViewFacility facility={facilityData} user={true} />
              <AddFacility facility={facilityData} />
            </>
          ) : (
            facilities.map((facility) => {
              return (
                <CCard
                  style={{ width: '30rem', cursor: 'pointer' }}
                  key={facility._id}
                  className="col-6 m-2"
                >
                  <CCarousel controls dark transition="crossfade" interval={10000}>
                    <CCarouselItem>
                      <CImage className="d-block w-100" src={tennis} alt="slide 1" />
                    </CCarouselItem>
                    <CCarouselItem>
                      <CImage className="d-block w-100" src={badminton} alt="slide 2" />
                    </CCarouselItem>
                  </CCarousel>
                  <CCardBody>
                    <div className="d-flex justify-content-between">
                      <CCardTitle>{facility.name}</CCardTitle>
                      <div>
                        <CButton
                          color="primary"
                          className="mx-3"
                          size="sm"
                          onClick={() => showFacility(facility)}
                        >
                          View
                        </CButton>
                        <CIcon
                          icon={cilDelete}
                          style={{ cursor: 'pointer' }}
                          onClick={() => showDelete(facility)}
                        />
                      </div>
                    </div>
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
            })
          )}
        </div>
      )}
    </>
  )
}

export default UserFacilities
