import React, { useState } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import workerData from './workers.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const { BaseLayer } = LayersControl;


(L.Icon.Default.prototype as any)._getIconUrl = undefined;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// full screen
const FullscreenToggle: React.FC = () => {
  const mapRef = useMap();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.getContainer().requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      style={{
        position: 'absolute',
        top: 60,
        right: 10,
        zIndex: 1000,
        padding: '5px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M6 14h-2v6h6v-2h-4v-4zm0-4v-4h4v-2h-6v6zm16 8h-6v2h6v-6h-2v4zm-6-16v2h4v4h2v-6h-6z" />
      </svg>
    </button>
  );
};

// pan control
const PanControl: React.FC = () => {
  const map = useMap();

  const panMap = (direction: string) => {
    const panDistance = 0.01; 
    let newCenter = map.getCenter();

    switch (direction) {
      case 'up':
        newCenter = new L.LatLng(newCenter.lat + panDistance, newCenter.lng);
        break;
      case 'down':
        newCenter = new L.LatLng(newCenter.lat - panDistance, newCenter.lng);
        break;
      case 'left':
        newCenter = new L.LatLng(newCenter.lat, newCenter.lng - panDistance);
        break;
      case 'right':
        newCenter = new L.LatLng(newCenter.lat, newCenter.lng + panDistance);
        break;
      default:
        break;
    }
    map.panTo(newCenter);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 60,
      left: 10,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <button onClick={() => panMap('up')} style={buttonStyle}>↑</button>
      <div style={{ display: 'flex' }}>
        <button onClick={() => panMap('left')} style={buttonStyle}>←</button>
        <button onClick={() => panMap('right')} style={buttonStyle}>→</button>
      </div>
      <button onClick={() => panMap('down')} style={buttonStyle}>↓</button>
    </div>
  );
};


const buttonStyle = {
  margin: '2px',
  padding: '5px 10px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '5px',
  cursor: 'pointer',
};

//  pour obtenir la couleur du marqueur
const getMarkerColor = (status: string) => {
  switch (status) {
    case 'Connected':
      return 'green';
    case 'In Danger':
      return 'red';
    case 'Disconnected':
      return 'black';
    case 'Suspicious':
      return 'orange';
    case 'Unknown': 
      return 'yellow';
    default:
      return 'gray'; 
  }
};

const Map: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string>('worldImagery');

  return (
    <MapContainer
      center={[35.7673, -5.8047]} 
      zoom={13} //  zoom initial
      className="h-full w-full"
      attributionControl={false}
    >
      <LayersControl position="topright">
        <BaseLayer checked={selectedLayer === 'worldImagery'} name="World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            eventHandlers={{
              add: () => setSelectedLayer('worldImagery'),
            }}
          />
        </BaseLayer>
        <BaseLayer checked={selectedLayer === 'streetMap'} name="Street Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            eventHandlers={{
              add: () => setSelectedLayer('streetMap'),
            }}
          />
        </BaseLayer>
      </LayersControl>

      {/* Affichage des marqueurs */}
      {workerData.workers.map(worker => (
        <Marker
          key={worker.id}
          position={[worker.location.latitude, worker.location.longitude]}
          icon={L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: ${getMarkerColor(worker.status)}; width: 12px; height: 12px; border-radius: 50%;"></div>`,
          })}
        >
          <Popup>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ marginRight: '10px' }} />
              <div style={{ flexGrow: 1 }}>
                <strong style={{ fontSize: '16px' }}>{worker.name}</strong><br />
                <button style={{
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}>
                  {worker.phone}
                </button>
                <br />
                Status: <span style={{ color: getMarkerColor(worker.status) }}>{worker.status}</span><br />
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      <FullscreenToggle />
      <PanControl />
    </MapContainer>
  );
};

export default Map;
