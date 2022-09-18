import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TheNavbar = () => {
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchField}`);
  };

  return (
    <nav>
      <Link to="/">
        <h1>KINOPICKS</h1>
      </Link>
      <Link to="/user">
        <p>User</p>
      </Link>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchField} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default TheNavbar;
