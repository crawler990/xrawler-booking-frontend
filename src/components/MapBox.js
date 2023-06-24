import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

function MapBox({ markers }) {
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic292aWV0dXNlciIsImEiOiJjbGlvNzJraW4wNXByM2xsYnpqcGZuemZiIn0.a2s7Q8KIm-bomF07QpweGA'
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [36.817223, -1.286389],
      zoom: 9,
    })

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([markers.longitude, markers.latitude])
      .addTo(map)
    return () => map.remove()
  }, [])

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>
}

export default MapBox
