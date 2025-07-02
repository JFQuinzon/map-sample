import logo from './logo.svg';
import './App.css';
import GoogleMapComponent from './components/google-map';
import MapComponent from './components/leaflet-map';
import MapWithRouting from './components/MapWithRouting';
import MapDistanceOnly from './components/MapDistanceOnly';

function App() {
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6378; // Radius of the Earth in km
    const toRad = (angle) => angle * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
              Math.sin(dLon / 2) ** 2;
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; // Distance in km
}

// Example usage:
const lat1 = 14.584357360375074, lon1 = 121.16885353173011;
const lat2 = 14.610022963470245, lon2 = 121.1936554221686;

console.log(haversine(lat1, lon1, lat2, lon2));

  return (
    <div className="App">
      <div>
      <h1>Google Map Integration</h1>
      <GoogleMapComponent />
      <MapComponent />
      <MapWithRouting />
      {/* <MapDistanceOnly /> */}
    </div>
    </div>
  );
}

export default App;
