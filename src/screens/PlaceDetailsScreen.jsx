import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../../StoreProvider";

const PlaceDetailsScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { userLoggedIn } = state;
  const [place, setPlace] = useState();

  console.log(userLoggedIn);

  const { id } = useParams();
  const navigate = useNavigate();

  const backendAPI = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const fetchPlace = async () => {
    dispatch({ type: "FETCH_DATA" });
    const { data } = await axios.get(`${backendAPI}/api/places/${id}/`);
    // console.log(data);
    setPlace(data);
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

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          // border: "1px solid red",
          // position: "relative",
          // marginLeft: "100px",
          // marginTop: "-150px",
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
            style={{ height: "100%", width: "50%" }}
          />
        </div>

        <div>
          <h2>
            Place Name: <span style={{ fontSize: "14px" }}>{place.title} </span>
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
          <p>Created by: {place.creator}</p>
          <p>Created at: {new Date(place.createdAt).toLocaleDateString()}</p>
        </div>
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
        ) : userLoggedIn._id === place.creator ? (
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
