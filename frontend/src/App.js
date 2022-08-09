import React from "react";
import LandingPage from "./screens/LandingPage/LandingPage";
import RegistrationPage from "./screens/RegistrationPage/RegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import MyNotes from "./screens/MyNotes/MyNotes";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import ProfilePage from "./screens/Profile/ProfilePage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/register"
            element={<LandingPage login="false" />}
            exact
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LandingPage login="true" />} exact />
          <Route path="/mynotes" element={<MyNotes />} exact />
          <Route path="/createnote" element={<CreateNote />} exact />
          <Route path="/note/:id" element={<SingleNote />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
