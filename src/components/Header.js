import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onReset, expeditionsCount }) => {
  const location = useLocation();
  return (
    <header className="row">
      <nav className="navbar bg-primary col-12">
        <a className="nav-link text-white h5" href="https://www.geektrust.in/">
          GeekTrust
        </a>
        {location.pathname === '/' && (
          <button
            className="btn btn-outline-light"
            onClick={onReset}
            disabled={expeditionsCount === 0}
          >
            Reset
          </button>
        )}
      </nav>
      <h1 className="col-12 text-center my-3">{title}</h1>
    </header>
  );
};

export default Header;
