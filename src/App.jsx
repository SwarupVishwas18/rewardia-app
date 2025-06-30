import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import Shop from "./Shop";
import Account from "./Account";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/shop" Component={Shop} />
        <Route path="/account" Component={Account} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
