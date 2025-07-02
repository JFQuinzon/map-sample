import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix missing marker icon
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to handle routing without displaying the route details
const RoutingMachine = ({ origin, destination, setDistance }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Calculate the distance without showing the route
    const control = L.Routing.control({
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      waypoints: [L.latLng(origin), L.latLng(destination)],
      // routeWhileDragging: false,  // Don't show route dragging
      // showAlternatives: false,    // Don't show alternative routes
      createMarker: () => null,   // Don't create markers for waypoints
      // lineOptions: {
      //   styles: [{ color: 'transparent' }]  // Make the route line invisible
      // },
      // fitSelectedRoutes: false,  // Don't fit the route to the map view
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        const distance = (route.summary.totalDistance / 1000).toFixed(2);  // Distance in kilometers
        setDistance(distance); // Set the distance
      })
      .addTo(map);
      control.hide();
    return () => {
      map.removeLayer(control);  // Cleanup on unmount
    };
  }, [map, origin, destination, setDistance]);

  return null;
};

const MapDistanceOnly = () => {
  const [origin, setOrigin] = useState([14.584357360375074, 121.16885353173011]); // Example: Manila
  const [destination, setDestination] = useState([14.610022963470245, 121.1936554221686]); // Example: Quezon City
  const [distance, setDistance] = useState(null);

  return (
    <div>
      <h3>Road Distance Calculator</h3>
      <button
        onClick={() => setDistance(null)} // Reset distance on button click
        style={{
          padding: "10px",
          marginBottom: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Calculate Distance
      </button>

      {distance && <p>Distance: {distance} km</p>} {/* Display distance */}

      <MapContainer center={origin} zoom={12} style={{ height: "100vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={origin} icon={customIcon} />
        <Marker position={destination} icon={customIcon} />
        <RoutingMachine origin={origin} destination={destination} setDistance={setDistance} />
      </MapContainer>
    </div>
  );
};

export default MapDistanceOnly;
