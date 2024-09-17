import { useContext, useEffect, useState } from "react";
import Header from "../components/Header1";
import NavLinks from "../components/Header";
import axios from "axios";
import PlaceItem from "../components/PlaceItem";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ControlledCarousel from "../components/ControlledCarousel";
import { Button, Container, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Store } from "../../StoreProvider";

function HomeScreen({ toggleSidebar }) {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { userLoggedIn } = state;
  const [places, setPlaces] = useState([]);

  const backendAPI = import.meta.env.VITE_API_URL;

  const fetchPlaces = async () => {
    const { data } = await axios.get(`${backendAPI}/api/places/`);
    console.log(data);
    setPlaces(data);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <>
      <Container className="container">
        <div>
          <ControlledCarousel places={places} />
        </div>

        <div>
          <Row
            style={{
              paddingTop: "10px",
            }}
          >
            {places &&
              places.map((place) => (
                <Col
                  key={place._id}
                  onClick={() => navigate(`/${place._id}`)}
                  sm={6}
                  md={4}
                  lg={3}
                  style={{ marginBottom: "10px" }}
                >
                  <PlaceItem place={place} />
                </Col>
              ))}
          </Row>
        </div>
        <div>
          {userLoggedIn && (
            <Button
              onClick={() => navigate("/add")}
              style={{ backgroundColor: "#343a40", margin: 0 }}
            >
              Add place
            </Button>
          )}
        </div>
      </Container>
    </>
  );
}

export default HomeScreen;
