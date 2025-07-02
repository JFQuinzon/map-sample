import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 14.5995, // Default to Manila
  lng: 120.9842,
};

const GoogleMapComponent = () => {
  const [marker, setMarker] = useState(null);

  const handleMapClick = (event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBfeD60EqbUHeAdl7eLmAekqU4iQBKtzVk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      {marker && (
        <p>
          Saved Location: {marker.lat}, {marker.lng}
        </p>
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
