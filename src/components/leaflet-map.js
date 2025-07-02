import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icon in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = () => {
  const [position, setPosition] = useState([12.8797, 121.7740]); // Default: Manila
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [searchResults, setSearchResults] = useState([]); // Search results

  // Function to handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
        alert("No results found");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Handle selecting a location from search results
  const handleSearchSelect = (lat, lon) => {
    setPosition([lat, lon]);
    setSearchResults([]); // Clear search results after selection
    setSearchQuery(""); // Clear input field
  };

  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter a location..."
          style={{ flex: "1", padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleSearchClick}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <ul
          style={{
            background: "#fff",
            listStyleType: "none",
            padding: 0,
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ddd",
          }}
        >
          {searchResults.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSearchSelect(place.lat, place.lon)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* Leaflet Map */}
      <MapContainer center={position} zoom={6} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapClickHandler />
        {position && <Marker position={position} icon={customIcon} />}
      </MapContainer>

      {/* Show Saved Location */}
      <p>Saved Location: {position[0]}, {position[1]}</p>
    </div>
  );
};

export default MapComponent;
