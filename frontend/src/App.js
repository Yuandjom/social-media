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

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { NavigateBefore } from "@mui/icons-material";

function App() {
  //note that the /:userId is based on the specific user

  //this will grab the current mode of the state
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token)); //if the token exist we are authorized

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
