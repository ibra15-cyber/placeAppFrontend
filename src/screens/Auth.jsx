import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { redirect, useNavigate } from "react-router-dom";
import { Store } from "../../StoreProvider";

function Auth() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const [image, setImage] = useState("");

  //LOGIN AND SIGNUP FORM DATA HANDLE
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  //FUNCTIONS TO CONTROL LOGIN AND REGISTER INPUTS
  const onChangeSignInInput = (e) => {
    const { name, value } = e.target;

    setSignInFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeSignUpInput = (e) => {
    const { name, value } = e.target;

    setSignUpFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //STATE TO CONTROL RENDER SCREEN RENDER
  const [isSignIn, setSignIn] = useState(true);

  const toggleSignIn = () => {
    setSignIn((prev) => !prev);
  };

  const submitInputHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const { data } = await axios.post(`/api/users/signin`, signInFormData);
        setSignInFormData({
          email: "",
          password: "",
        });
        dispatch({ type: "LOG_IN", payload: data });
        localStorage.setItem("userLoggedIn", JSON.stringify(data));
        navigate("/");
      } else {
        const { data } = await axios.post(`/api/users/signup`, signUpFormData);
        setSignUpFormData({
          name: "",
          email: "",
          password: "",
          image: "",
        });
        navigate("/");
        dispatch({ type: "LOG_IN", payload: data });
        localStorage.setItem("userLoggedIn", JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const [file, setFile] = useState("");
  // const [image, setImage] = useState("");
  const uploadFileHandler = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const formDataBody = new FormData();
    formDataBody.append("file", file);

    try {
      const { data } = await axios.post("/api/upload", formDataBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImage(data.secure_url);

      setSignUpFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      console.log(err);
    }
  };

  const divStyle = {
    height: "500px",
    border: "2px solid black",
    backgroundColor: "#cdc3c3",
    borderRadius: "5px",
    marginTop: "10px",
    width: "40%",
  };

  if (isSignIn) {
    divStyle.minHeight = "50%";
  }

  return (
    <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
      <div className={`signIn_form ${isSignIn ? "" : "active"}`}>
        <div>
          <Form onSubmit={submitInputHandler}>
            {isSignIn ? (
              <>
                <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="email"
                    value={signInFormData.email}
                    name="email"
                    onChange={onChangeSignInInput}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    value={signInFormData.password}
                    name="password"
                    onChange={onChangeSignInInput}
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      border: ".1px solid black",
                      height: "100px",
                      width: "100px",
                      // borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    {image && (
                      <img
                        src={image}
                        alt="Description of the image"
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>

                <Form.Group>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={uploadFileHandler}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    value={signUpFormData.name}
                    name="name"
                    onChange={onChangeSignUpInput}
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="email"
                    value={signUpFormData.email}
                    name="email"
                    onChange={onChangeSignUpInput}
                    placeholder="Enter email address"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    value={signUpFormData.password}
                    name="password"
                    onChange={onChangeSignUpInput}
                    placeholder="Enter password"
                  />
                </Form.Group>
              </>
            )}
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              {isSignIn ? "LOGIN" : "REGISTER ACCOUNT"}
            </Button>
          </Form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={toggleSignIn}
              style={{ backgroundColor: "#343a40" }}
            >
              SWITCH TO {isSignIn ? "SIGNUP" : "SIGNIN"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
