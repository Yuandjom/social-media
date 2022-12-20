//note that scenes are like layout with pages

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Home from "layout/homePage/Home";
import Login from "layout/loginPage/Login";
import Profile from "layout/profilePage/Profile";

function App() {
  //note that the /:userId is based on the specific user
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
