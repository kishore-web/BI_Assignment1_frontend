import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="border-bottom py-2">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand text-danger fw-bolder fs-3">
            MeetUp
          </Link>
          <form
            className="d-flex align-items-center position-relative"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <FaSearch className="text-secondary position-absolute m-2" />
            <input
              className="form-control ps-4"
              type="search"
              placeholder="Search by event title and tags"
              value={searchQuery}
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
