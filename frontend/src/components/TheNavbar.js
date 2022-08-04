import { Link } from "react-router-dom";

const TheNavbar = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1>KINOPICKS</h1>
        </Link>
      </div>
    </header>
  );
};

export default TheNavbar;
