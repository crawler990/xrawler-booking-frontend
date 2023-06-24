import { cilBackspace, cilArrowLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()

  return (
    <CButton
      className="mx-2"
      onClick={() => navigate(-1)}
      style={{ width: '80px', height: '35px' }}
    >
      <CIcon icon={cilArrowLeft} /> Back
    </CButton>
  )
}

export default BackButton
