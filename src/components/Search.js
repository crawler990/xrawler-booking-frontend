import { cilLocationPin } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useState } from 'react'

function Search({ values, results }) {
  const [param, setParam] = useState('')

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    console.log(inputValue)
    const filteredItems = getFilteredItems(inputValue, values)
    console.log(filteredItems)
    setParam(inputValue)
    results(filteredItems)
  }

  const getFilteredItems = (param, values) => {
    if (!param) {
      return values
    }
    return values.filter((x) => x.name.toLowerCase().includes(param.toLowerCase()))
  }

  return (
    <div className="d-flex justify-content-center mb-3">
      <input
        type="text"
        className="form-control"
        style={{ width: '350px', marginRight: '100px' }}
        value={param}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Search
