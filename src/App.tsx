import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AlbumPage from "./pages/AlbumPage";
import { UserProvider } from "../src/context/UserContext";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <UserProvider>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
