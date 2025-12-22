"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapComponentProps } from '@/app/types';
import L from 'leaflet';
import { QRCodeCanvas } from 'qrcode.react';
import 'leaflet/dist/leaflet.css';
import { calculateDistance } from '@/app/lib/distance';

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
  const [mapReady, setMapReady] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);

  const position: [number, number] = [
    parseFloat(coordinates.lat),
    parseFloat(coordinates.lon)
  ];

  const MarkerIcon = L.icon({
    iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-location-icon-svg-download-png-2561454.png?f=webp&w=256',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const mapUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}`;

  const shareMap = () => {
    const shareText = `Check out this location in Rwanda: ${coordinates.lat},${coordinates.lon}`;
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMapReady(true);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const targetLat = parseFloat(coordinates.lat);
        const targetLon = parseFloat(coordinates.lon);

        const dist = calculateDistance(userLat, userLon, targetLat, targetLon);
        setDistance(dist);
      });
    }
  }, [coordinates]);

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

          <div className='mb-4'>
            <p className='mt-6'>Share this Map and get the easiest way to navigate to that area.</p>
            {distance !== null && (
              <p className="mt-1">
                You need to travel a distance of 
                <span className='font-bold text-orange-400 underline text-md'> {distance.toFixed(2)} km</span> from your current location.
              </p>
            )}
          </div>
          <button
            onClick={shareMap}
            className="inline-block px-4 py-2 mt-1 text-white bg-orange-700 rounded hover:bg-orange-600 hover:cursor-pointer"
          >
            Share the Map
          </button>

          <div className="flex flex-col items-end mt-4">
            <QRCodeCanvas value={mapUrl} size={100} />
            <p className='flex items-center justify-center text-xs text-center'>Scan to Open Google Maps</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MapComponent;
