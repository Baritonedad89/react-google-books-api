import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper grey lighten-5">
          <a href="#" className="brand-logo black-text center">Google Books</a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li ><Link to={"/"} className="black-text" >Search</Link></li>
            <li><Link to={"/api/books"} className="black-text">Saved</Link></li>
          </ul>
        </div>
      </nav>
    </div>



  )

}

export default Navbar 