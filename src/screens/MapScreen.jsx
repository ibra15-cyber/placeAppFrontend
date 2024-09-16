import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../../StoreProvider";

const libraries = ["places"];

const MapScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { userLoggedIn } = state;
  const { placeInfo } = state;

  const [googleApiKey, setGoogleApiKey] = useState("");

  const mapRef = useRef();
  const searchBoxRef = useRef();

  // console.log(placeInfo.location);

  const [center, setCenter] = useState({
    lat: placeInfo.location.lat,
    lng: placeInfo.location.lng,
  });
  const [location, setLocation] = useState(center);

  const backendAPI = import.meta.env.VITE_API_URL;

  const fetchGoogleApiKey = async () => {
    try {
      dispatch({ type: "FETCH_DATA" });
      const { data } = await axios.get(`${backendAPI}/api/keys/google`, {
        headers: { Authorization: "Bearer " + userLoggedIn.token },
      });
      setGoogleApiKey(data.key);
      // console.log("data from map", data);
      dispatch({ type: "FETCH_END" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "FETCH_END" });
    }
  };

  //even is the center is 0,0 lat lng, this will send them to my current location
  const getCurrentUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Sorry browser os not supported");
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
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      setCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    }
  };

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      const place = places[0].geometry.location;
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

  useEffect(() => {
    fetchGoogleApiKey();
    // getCurrentUserLocation();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    >
      <div>
        <LoadScript libraries={libraries} googleMapsApiKey={googleApiKey}>
          <GoogleMap
            mapContainerStyle={{
              width: "100vw",
              height: "100vh",
            }}
            center={center}
            zoom={17}
            onLoad={(map) => (mapRef.current = map)}
            onIdle={onIdle}
          >
            <Marker position={location} />
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Enter location"
                style={{
                  boxSizing: "border-box",
                  border: "1px solid transparent",
                  width: "240px",
                  height: "32px",
                  position: "absolute",
                  top: "10px",
                  left: "50%",
                  padding: "0 12px",
                  borderRadius: "3px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  fontSize: "14px",
                  outline: "none",
                  textOverflow: "ellipsis",
                  transform: "translateX(-50%)",
                }}
              />
            </StandaloneSearchBox>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapScreen;
