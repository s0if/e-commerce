import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {

  return (
    <div>
      <nav className="navbar navbar-expand-lg b-n pb-5">
        <div className="container-fluid d-flex justify-content-end">
          <button className="navbar-toggler bg-white " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          {/* <button class="navbar-toggler custom-navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}

          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav  me-auto  ">
              <li className="nav-item ">
                <NavLink className="nav-link text-white" aria-current="page" to="/" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/products">Products</NavLink>
              </li>
            </ul>
            <ul className='d-flex justify-content-end navbar-nav  '>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login">Login</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link text-white" to="/cart">Cart</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
