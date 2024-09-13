import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useNavigation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

const PlaceItem = ({ place }) => {
  return (
    <Container fluid="md">
      <div>
        <Card
          style={{
            height: "300px",
            overflow: "hidden ",
            position: "relative",
          }}
        >
          <Card.Img
            variant="top"
            // height={200}
            // width={200}
            src={place.image}
            alt={place.title}
            style={{ height: "150px" }}
          />
          <Card.Body>
            <Card.Title>
              <p
                style={{
                  lineHeight: "15px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {place.title}
              </p>
            </Card.Title>
            <Card.Text>{place.address}</Card.Text>
            <Button
              variant="primary"
              style={{ position: "abolute", top: 0, left: 0 }}
            >
              VIEW PLACE
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default PlaceItem;
