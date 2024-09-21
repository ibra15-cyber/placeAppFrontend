import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../../StoreProvider";
import Loader from "../components/Loader";

const PlaceDetailsScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { userLoggedIn } = state;
  const [place, setPlace] = useState({});

  console.log(userLoggedIn);

  const { id } = useParams();
  const navigate = useNavigate();

  const backendAPI = import.meta.env.VITE_API_URL;

  const fetchPlace = async () => {
    dispatch({ type: "FETCH_DATA" });
    const { data } = await axios.get(`${backendAPI}/api/places/${id}/`);
    // console.log(data);
    setPlace(data);
    dispatch({ type: "GET_CREATED_PLACE_DETAIL", payload: data });
  };

  useEffect(() => {
    fetchPlace();
  }, []);

  const deleteHandler = async () => {
    dispatch({ type: "FETCH_DATA" });
    await axios.delete(`${backendAPI}/api/places/${id}/`);
    dispatch({ type: "FETCH_END" });

    navigate("/");
  };

  const handleMapAddress = () => {
    navigate("/map");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate("/")} />

        <div
          style={{
            border: "2px solid black",
            width: "50%",
            height: "50%",
            margin: "5%",
          }}
        >
          <img
            src={place.image}
            alt={place.title}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        {place.location && (
          <div>
            <h2>
              Place Name:{" "}
              <span style={{ fontSize: "14px" }}>{place.title} </span>
            </h2>
            <h3>
              Place Description:{" "}
              <span style={{ fontSize: "14px" }}>{place.description}</span>
            </h3>
            <h3>
              Address: <span style={{ fontSize: "14px" }}>{place.address}</span>
            </h3>
            <p>Latitude: {place.location.lat}</p>
            <p>Longitude: {place.location.lng}</p>
            {/* <p>Created by: {userLoggedIn.name}</p> */}
            <p>Created at: {new Date(place.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "-100px",
          position: "absolute",
          marginLeft: "100px",
        }}
      >
        {state.isLoading ? (
          <div>Loading...</div>
        ) : userLoggedIn && userLoggedIn._id === place.creator ? (
          <>
            <Button
              onClick={() => navigate(`/update/${id}`)}
              style={{ marginRight: "5px" }}
            >
              EDIT
            </Button>
            <Button
              onClick={deleteHandler}
              style={{ backgroundColor: "#343a40" }}
            >
              DELETE
            </Button>
          </>
        ) : (
          <div></div>
        )}

        <Button
          onClick={handleMapAddress}
          style={{ backgroundColor: "#343a40", marginLeft: "10px" }}
        >
          VIEW PLACE ON MAP
        </Button>
      </div>
    </>
  );
};

export default PlaceDetailsScreen;
