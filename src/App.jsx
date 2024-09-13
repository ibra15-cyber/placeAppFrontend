import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlaceDetailsScreen from "./screens/PlaceDetailsScreen";
import AddPlaceScreen from "./screens/AddPlaceScreen";
import UpdatedScreen from "./screens/UpdatedScreen";
import Profile from "./screens/Profile";
import ProfileDetails from "./screens/ProfileDetails";
import Auth from "./screens/Auth";
import Auth2 from "./screens/Auth2";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import MapScreen from "./screens/MapScreen";
import AdminRoute from "./components/AdminRoute";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    console.log("toggle sidebar is called");
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BrowserRouter>
        <div style={{}}>
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className={`content ${isOpen ? "active" : ""}`} style={{}}>
            <Header toggleSidebar={toggleSidebar} />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/:id" element={<PlaceDetailsScreen />} />
              <Route path="/add" element={<AddPlaceScreen />} />
              <Route path="/update/:id" element={<UpdatedScreen />} />
              <Route
                path="/profile"
                element={
                  <AdminRoute>
                    <Profile />
                  </AdminRoute>
                }
              />
              <Route path="/profile/:id" element={<ProfileDetails />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/map/" element={<MapScreen />} />
              <Route path="/test" element={<Auth2 />} />
            </Routes>
            <Footer style={{ position: "fixed", bottom: 0 }} />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
