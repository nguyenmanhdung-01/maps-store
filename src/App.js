import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { FaLocationDot } from "react-icons/fa6";
import Map from "./Map";

// Cập nhật component này để chấp nhận và hiển thị children
const AnyReactComponent = ({ text }) => <div>{text}</div>;

function App() {
  const [coords, setCoords] = useState({
    // lat: 21.05046452296726,
    // lng: 105.78286341534233,
  });
  const [places, setPlaces] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // console.log("coords", coords);

  const fn = async () => {
    try {
      const result = await geocodeByAddress(places);
      console.log("result: ", result);
      const lnglat = await getLatLng(result[0]);
      setCoords(lnglat);
    } catch (error) {
      console.error("Geocoding error: ", error);
    }
  };

  return (
    <div className="App" style={{ width: "50vw", height: "50vh" }}>
      <input
        type="text"
        value={places}
        onChange={(e) => setPlaces(e.target.value)}
      />
      <button type="button" onClick={fn}>
        Tìm
      </button>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCDbgAen3cHBKYwoyJzBKQbEnV7iBpDUGE" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={15}
      >
        <AnyReactComponent
          lat={coords.lat}
          lng={coords.lng}
          text={
            <FaLocationDot
              size={24}
              style={{ color: "red", fontSize: "24px" }}
            />
          }
        />
      </GoogleMapReact>
      <Map />
    </div>
  );
}

export default App;
