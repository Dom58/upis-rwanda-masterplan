"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapComponentProps } from '@/app/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMapReady(true);
    }
  }, []);

  const position: [number, number] = [
    parseFloat(coordinates.lat),
    parseFloat(coordinates.lon)
  ];

  const MarkerIcon = L.icon({
    iconUrl: '/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const shareMap = () => {
    const latitude = coordinates.lat;
    const longitude = coordinates.lon;
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const shareText = `Check out this location in Rwanda: ${latitude}, ${longitude}`;
    const shareData = {
      title: 'Rwanda Map',
      text: shareText,
      url: mapUrl,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <>
      {mapReady && (
        <div>
          <MapContainer center={position} zoom={13} className="w-full h-96">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={MarkerIcon}>
              <Popup>
                Coordinates: {coordinates.lat}, {coordinates.lon}
              </Popup>
            </Marker>
          </MapContainer>
          
          <p className='mt-6'>Share this Map and get the easiest way to navigate to that area.</p>
          <button
            onClick={shareMap}
            className="inline-block px-4 py-2 mt-1 text-white bg-orange-700 rounded hover:bg-orange-600"
          >
            Share the Map
          </button>
        </div>
      )}
    </>
  );
};

export default MapComponent;
