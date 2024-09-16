import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UpdatedScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState();
  // console.log(place.title);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  // const [title, setTitle] = useState();
  // const [description, setDescription] = useState();

  // console.log(title);

  const backendAPI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getPlace = async () => {
      try {
        const { data } = await axios.get(`${backendAPI}/api/places/${id}`);
        setPlace(data);
        // console.log(data);
        setFormData({ title: data.title, description: data.description });
      } catch (err) {
        console.log(err);
      }
    };

    getPlace();
  }, [id]);

  const setFormHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendAPI}/api/places/${id}`, formData);
      setFormData({ title: "", description: "" });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!place) {
    return <div>loading</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => navigate(`/${id}`)}
        />
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={setFormHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description: </Form.Label>
          <Form.Control
            type="textarea"
            name="description"
            value={formData.description}
            onChange={setFormHandler}
          />
        </Form.Group>
        <Button type="submit" style={{ marginTop: "5px" }}>
          SUBMIT
        </Button>
      </Form>
    </div>
  );
}

export default UpdatedScreen;
