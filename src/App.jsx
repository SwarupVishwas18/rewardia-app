import { useState, useEffect, use } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import Shop from "./Shop";
import Account from "./Account";
import { checkSession, getAllRewards, initDatabase } from "./api"
import Landing from "./Landing"

function App() {





  return (
    <BrowserRouter>

      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/shop" Component={Shop} />
        <Route path="/account" Component={Account} />
        <Route path="/" Component={Landing} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
