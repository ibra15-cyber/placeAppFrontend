import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileDetails() {
  const [userplace, setUserPlace] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchUserCreatedPlace();
  }, []);

  const backendAPI = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const fetchUserCreatedPlace = async () => {
    try {
      const { data } = await axios.get(`${backendAPI}/api/places/user/${id}`);
      console.log(data);
      setUserPlace(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {userplace.map((user) => (
        <div key={user._id}>
          <div>{user.title}</div>
          <div>{user.description}</div>
          <img src={user.image} />
          <div>{user.address}</div>
        </div>
      ))}
    </div>
  );
}

export default ProfileDetails;
