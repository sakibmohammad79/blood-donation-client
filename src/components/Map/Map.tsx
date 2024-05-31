"use client";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 23.685, // Latitude for Bangladesh
  lng: 90.3563, // Longitude for Bangladesh
};

const donationCenters = [
  //   { id: 1, lat: 23.8103, lng: 90.4125, name: "Dhaka" }, // Coordinates for Dhaka
  { id: 2, lat: 22.3569, lng: 91.7832, name: "Chittagong" }, // Coordinates for Chittagong
  // Add more centers if needed
];

const Map = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCGmfomIvjC8ChzxTa9TrPk1XYWD7GL6vU">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        {donationCenters.map((center) => (
          <Marker
            key={center.id}
            position={{ lat: center.lat, lng: center.lng }}
            onClick={() => setSelectedCenter(center)}
          />
        ))}

        {selectedCenter && (
          <InfoWindow
            position={{ lat: selectedCenter.lat, lng: selectedCenter.lng }}
            onCloseClick={() => setSelectedCenter(null)}
          >
            <div>
              {/* <h3>{selectedCenter.name}</h3> */}
              <p>More information about this center.</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
