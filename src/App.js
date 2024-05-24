import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import LoginUserForm from "./Components/LoginUserForm";
import MainPage from "./Components/MainPage";
import RegisterForm from "./Components/RegisterForm";
import RegisterCompany from "./Components/RegisterCompany";
import LoginCompany from "./Components/LoginCompany";

function App() {
  return (
    <Routes>
      <Route element={<LoginUserForm />} path="/" />
      <Route element={<MainPage />} path="/Home" />
      <Route element={<RegisterForm />} path="/registration" />
      <Route element={<RegisterCompany />} path="/registration/company" />
      <Route element={<LoginCompany />} path="/company/login" />
    </Routes>
  );
}

export default App;
