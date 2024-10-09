// Components/Navbar.js
import React from 'react';

const Navbar = ({ onAddClick }) => {
  return (
    <div className="container-lg mb-3 rounded " style={{ backgroundColor: '#606ad2' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">Store King</a>
          <button
            className="btn btn btn-outline-light"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
            onClick={onAddClick}
          >
            Add Products
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
