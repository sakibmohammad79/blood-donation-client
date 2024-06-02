"use client";
import { Box } from "@mui/material";
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

// Define a type for donation centers
type DonationCenter = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};

const donationCenters: DonationCenter[] = [
  { id: 2, lat: 22.3569, lng: 91.7832, name: "Chittagong" }, // Coordinates for Chittagong
];

const Map = () => {
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(
    null
  );

  return (
    <LoadScript
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
    >
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
            <Box>
              <Box component="h5">{selectedCenter.name}</Box>
              <Box component="p">More information about this center.</Box>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
