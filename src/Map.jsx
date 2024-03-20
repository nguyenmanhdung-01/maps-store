import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FaLocationDot } from "react-icons/fa6";
import { MdEditLocationAlt, MdLocationCity } from "react-icons/md";
const containerStyle = {
  width: "50wh",
  height: "50vh",
};

const center = {
  lat: 21.05046452296726,
  lng: 105.78286341534233,
};

const position = {
  lat: 21.05046452296726,
  lng: 105.78286341534233,
};

const locations = [
  {
    name: "Cửa hàng 1",
    lat: 21.05042586521301,
    lng: 105.78385183966874,
    icon: "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-cute-cartoon-light-bulb-image_1134759.jpg",
    info: "Thông tin về cửa hàng 2.",
  },
  {
    name: "Cửa hàng 2",
    lat: 21.05060108986956,
    lng: 105.78346560158784,
    icon: <MdEditLocationAlt />,
    info: "Thông tin về cửa hàng 3.",
  },
  {
    name: "Cửa hàng 3",
    lat: 21.050623618739007,
    lng: 105.78373114026846,
    icon: <MdLocationCity />,
    info: "Thông tin về cửa hàng 1.",
  },
  // thêm các cửa hàng khác tại đây
];

function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCDbgAen3cHBKYwoyJzBKQbEnV7iBpDUGE",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            url: location.icon,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          onClick={() => setSelectedLocation(location)}
        />
      ))}
      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div>
            <h3>{selectedLocation.name}</h3>
            <p>{selectedLocation.info}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
