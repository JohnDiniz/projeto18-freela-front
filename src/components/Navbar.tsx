import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { TbVinyl } from "react-icons/tb";
import { useUserContext } from "../context/UserContext";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useUserContext();

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
      {user && (
        <div className="profile-container">
          <img src={user.imgurl} alt="Profile" className="profile-image" />
          <span className="profile-name">Hello, {user.name}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
