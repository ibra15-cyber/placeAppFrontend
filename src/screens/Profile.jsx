import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const backendAPI = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${backendAPI}/api/users/`);
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {users.map((user) => (
        <div key={user._id}>
          {user.name}:
          <Link to={`/profile/${user._id}`} style={{ marginLeft: 5 }}>
            {user.email}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Profile;
