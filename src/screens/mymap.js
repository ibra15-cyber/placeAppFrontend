import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { Store } from "../../StoreProvider";

const libraries = ["places"];
function MapScreen() {
  const { userLoggedIn } = useContext(Store);

  const [center, setCenter] = useState({
    lat: 55.2,
    lng: -0.1,
  });

  const [location, setLocation] = useState();
  const [googleApiKey, setGoogleApiKey] = useState("");

  const mapRef = useRef(null);
  const placeRef = useRef(null);

  //get current location by updating center and location; both will update map and marker respectively
  const getCurrentUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Sorry broser os not supported");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const onIdle = () => {
    const newCenter = mapRef.current.getCenter();
    setCenter({
      lat: newCenter.lat(),
      lng: newCenter.lng(),
    });
    setLocation({
      lat: newCenter.lat(),
      lng: newCenter.lng(),
    });
  };

  const onPlacesChanged = () => {
    if (mapRef.current) {
      const places = mapRef.current.getPlaces();
      const place = places[0].geomertry.location;
      setLocation({
        lat: place.lat(),
        lng: place.lng(),
      });
      setCenter({
        lat: place.lat(),
        lng: place.lng(),
      });
    }
  };

  const backendAPI = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const fetchGoogleApiKey = async () => {
    const { data } = await axios.get(`${backendAPI}/api/keys/google`, {
      headers: { Authorization: "Bearer " + userLoggedIn.token },
    });
    setGoogleApiKey(data.key);
  };

  useEffect(() => {
    fetchGoogleApiKey();
    getCurrentUserLocation();
    console.log({ googleApiKey });
  }, []);

  return (
    <div>
      <LoadScript libraries={libraries} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          onLoad={(map) => (mapRef.current = map)}
          onIdle={onIdle}
          center={center}
          zooom={15}
          mapContainerStyle={{
            height: "80vh",
            width: "80vw",
          }}
        >
          <Marker position={location} />
        </GoogleMap>
        <StandaloneSearchBox
          onLoad={(ref) => (placeRef.current = ref)}
          onPlacesChanged={onPlacesChanged}
        ></StandaloneSearchBox>
      </LoadScript>
    </div>
  );
}

export default MapScreen;
