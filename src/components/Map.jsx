import { useRef } from "react";
import { MapContainer, TileLayer, Popup, Marker, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const { BaseLayer} = LayersControl
  const mapRef = useRef(null);
  // -1.2189538708279413, 36.889263278670875
  const position = [-1.2189538708279413, 36.889263278670875];
  const zoomNumber = 15;
  return (
    <MapContainer 
      center={position} 
      zoom={zoomNumber}
      scrollWheelZoom={false}
      ref={mapRef}
      style={{height: "100vh", width: "100vw"}}>
    <LayersControl>
            <BaseLayer  name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </BaseLayer>
            <BaseLayer checked name="Satellite View">
            <TileLayer
              url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
              maxZoom= {20}
              subdomains={['mt1','mt2','mt3']}
            />             
            </BaseLayer>
          </LayersControl>
    <Marker position={position}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  </MapContainer>
  )
}
