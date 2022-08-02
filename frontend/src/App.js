import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import Register from "./screens/RegisterScreen/RegisterPage";
import Login from "./screens/LoginScreen/LoginPage";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/createnote" element={<CreateNote />} exact />
        <Route path="/mynotes" element={<MyNotes />} exact />
        <Route path="/note/:id" component={<SingleNote/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
