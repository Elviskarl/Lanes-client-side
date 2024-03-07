import { useRef,useEffect,useState } from "react";
// import L from "leaflet";
import { MapContainer, TileLayer, Popup, Marker, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
// import warningIcon from "../assets/warning.svg";
import "leaflet/dist/leaflet.css";
import "./Map.css";


const style = {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  objectFit: 'fill',
  margin: 'auto',
}
// Define your custom icon
// const customIcon = L.icon({
//   iconUrl: warningIcon, // Path to your icon file
//   iconSize: [38, 95], // Size of the icon
//   iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
//   popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
// });

export default function Map() {
  const { BaseLayer} = LayersControl
  const mapRef = useRef(null);
  
  const [data,setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=>{
    async function fetchData(){
      try {
        const jsonResponse = await fetch('https://lanes-server.onrender.com/api/v1/images');
        const response = await jsonResponse.json();
        setData(response.data);
        setIsLoaded(true); // Set isLoaded to true only after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    },[]);
    console.log(data);
  // -1.2189538708279413, 36.889263278670875
  const position = [-1.2189538708279413, 36.889263278670875];
  const zoomNumber = 15;
  return (
    isLoaded && <MapContainer 
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
    <MarkerClusterGroup chunkedLoading>
      {data !==null && data.map(obj => {
        return (
          <Marker 
          position={obj.location.coordinates} 
          key={obj._id}
          title={obj.severity}
          // icon={customIcon}
          >
        <Popup>
          <img src={obj.cloudinary_url} alt="Image" style={style} loading="lazy"/>
          <br />
          <p style={{
            marginBottom: "5px",
            marginTop: "0",
            fontFamily: "monospace",
            fontSize: "1.2rem",
            color: "royalblue",
            lineHeight: "1.2"
          }}>Uploaded by {obj.user}.</p>
          <h3 style={{
            margin: "5px 0",
            fontFamily: "monospace",
            fontSize: "1.1rem",
            fontWeight: "lighter",
            color: "orangered"
            }}>Severity: {obj.severity}.</h3>
          <p style={{
            marginTop: "5px",
            fontFamily: "monospace",
            fontSize: "1rem",
            color: "rebeccapurple",
            marginBottom: "0",
            lineHeight: "1.2"
            }}>Date taken: {obj.dateTaken}.</p>
          </Popup>
        </Marker>)}
      )}
    </MarkerClusterGroup>
  </MapContainer>
  )
}
