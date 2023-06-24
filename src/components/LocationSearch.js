import React, { useState } from 'react'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

function LocationSearch() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const mapboxAccessToken =
    'pk.eyJ1Ijoic292aWV0dXNlciIsImEiOiJjbGlvNzJraW4wNXByM2xsYnpqcGZuemZiIn0.a2s7Q8KIm-bomF07QpweGA'

  mapboxgl.accessToken = mapboxAccessToken

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
        {
          params: {
            access_token: mapboxAccessToken,
            autocomplete: true,
            types: 'address',
            // limit: 5,
          },
        },
      )

      setSuggestions(response.data.features)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value) {
      fetchSuggestions(value)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.place_name)
    setSuggestions([])
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a location"
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.place_name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LocationSearch
