import { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fas, far, fal } from "@awesome.me/kit-KIT_CODE/icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Store } from "../../StoreProvider";

const AddPlaceScreen = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { userLoggedIn } = state;

  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    address: "",
    creator: userLoggedIn._id,
    lat: 0,
    lng: 0,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const backendAPI = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${backendAPI}/api/places/`, formData);

    //get the send back data and set to localStorage
    dispatch({ type: "GET_CREATED_PLACE_DETAIL", payload: data });
    localStorage.setItem("placeInfo", JSON.stringify(data));

    setFormData({
      title: "",
      description: "",
      image: "",
      address: "",
      creator: "",
      lat: 0,
      lng: 0,
      category: "",
    });
    navigate("/");
  };

  //formdata initializes categories
  //therefore when option is selected, evoke the onChange event
  // and for each category selected, return the prev items in the setform
  //and then change category to the value of the option
  const handleSelectedCategory = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  // const [imageFile, setImageFile] = useState(null);

  const uploadFileHandler = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const imageData = new FormData();
    imageData.append("file", file);

    try {
      const { data } = await axios.post(
        `${backendAPI}/api/upload/ `,
        imageData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(data.secure_url);

      setFormData((prev) => ({
        //ACTUAL APPENDING OF IMAGE TO FORMDATA
        ...prev,
        image: data.secure_url,
      }));
      setImage(data.secure_url); //JUST FOR THE DISPLAY
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          width: "40%",
          height: "100%",
          border: "2px solid black",
          backgroundColor: "#cdc3c3",
          borderRadius: "5px",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate("/")} />
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              name="image"
              // value={formData.image}
              value={image} //JUST FOR THE DISPLAY
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Image: </Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {}
          {/* <Form.Group>
            <Form.Label>Creator: </Form.Label>
            <Form.Control
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              required
            />
          </Form.Group> */}
          {/* <Form.Group>
            <Form.Label>Lat: </Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lon: </Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              required
            />
          </Form.Group> */}
          <Form.Group>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleSelectedCategory}
              style={{ margin: "5px 0" }}
            >
              <option value="">Select category</option>
              <option value="enterprise">Enterprise</option>
              <option value="university">University</option>
              <option value="carrier">Carrier</option>
            </Form.Select>
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="primary">
              Save Place
            </Button>
          </div>
        </Form>
      </Container>
      {/* <form onSubmit={handleSubmit} className="place-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

      

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label>Creator:</label>
        <input
          type="text"
          name="creator"
          value={formData.creator}
          onChange={handleChange}
          required
        />

        <label>Latitude:</label>
        <input
          type="number"
          step="0.0001"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          required
        />

        <label>Longitude:</label>
        <input
          type="number"
          step="0.0001"
          name="lon"
          value={formData.lon}
          onChange={handleChange}
          required
        />

        <select value={selectedCategory} onChange={handleSelectedCategory}>
          <option value="">Select category</option>
          <option value="enterprise">Enterprise</option>
          <option value="university">University</option>
          <option value="carrier">Carrier</option>
        </select>

        <button type="submit">Save Place</button>
      </form> */}

      {/* <Card style={{ display: "flex", flexDirection: "column", height: 500 }}>
        <Form
          onSubmit={handleSubmit}
          className="container width-30"
          as={Col}
          Col
          // md={2}
          style={{
            width: "50%",
            justifyContent: "center",
            justifyItems: "center",
            height: 50,
          }}
        >
          <Form.Group controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCreator">
            <Form.Label>Creator:</Form.Label>
            <Form.Control
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLat">
            <Form.Label>Latitude:</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLon">
            <Form.Label>Longitude:</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              name="lon"
              value={formData.lon}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Place
          </Button>
        </Form>
      </Card> */}
    </div>
  );
};

export default AddPlaceScreen;
