import MapViewDirections from 'react-native-maps-directions';
import './App.css'
import { useEffect, useState } from 'react';
import MapView from 'react-native-maps/lib/MapView';
// import "leaflet/dist/leaflet.css";

function App() {
  const [mapData, setMapData] = useState([])
  const [count, setCount] = useState(1);
  const [origin, setOrigin] = useState({ latitude: 0, longitude: 0 })
  const [reset, setReset] = useState(false)
  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 })

  useEffect(() => {
    fetch('http://localhost:1234').then((results) => results.json()).then((results) => setMapData(results))
  }, [])

  useEffect(() => {
    setReset(false)
  }, [reset])

  useEffect(() => {
    console.log(origin, destination)
  }, [origin, destination])

  const handleLocation = (latitude, longitude) => {
    setCount((count) => count + 1);
    if (count % 2 != 0)
      setOrigin({ latitude: latitude, longitude: longitude })
    else
      setDestination({ latitude: latitude, longitude: longitude })
  }
  const resetFn = () => {
    setOrigin({ latitude: 0, longitude: 0 })
    setDestination({ latitude: 0, longitude: 0 })
    setReset(true)
  }
  const GOOGLE_MAPS_APIKEY = import.meta.env.API_KEY;
  return (
    <>
      {mapData.map((i) => (
        <div key={i.id}>
          <button onClick={() => handleLocation(Number(i.lat), Number(i.lon))}>{i.name}, {i.state}</button>
        </div >
      ))
      }
      <button onClick={resetFn}>Reset</button>
      <MapView>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      </MapView >
    </>
  )
}

export default App
