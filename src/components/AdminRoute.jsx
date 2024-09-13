import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../StoreProvider";

const AdminRoute = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { userLoggedIn } = state;

  // console.log(userLoggedIn);

  return (
    <>
      {userLoggedIn && userLoggedIn.isAdmin ? (
        children
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
};

export default AdminRoute;
