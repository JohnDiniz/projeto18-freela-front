import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { TbVinyl } from "react-icons/tb";

import "../styles/Navbar.css";
// import profileImage from "../assets/h1n1xi5t99hb1.webp";

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <TbVinyl /> RetroTunes
        </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </div>
      </form>
      <div className="profile-container">
        {/* <img src={profileImage} alt="Profile" className="profile-image" /> */}
        <span className="profile-name">John Doe</span>
      </div>
    </nav>
  );
};

export default Navbar;
