import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
<nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Google Books</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to={"/"}>Search</Link></li>
        <li><Link to={"/api/books"}>Saved</Link></li>
      </ul>
    </div>
  </nav>


        
    )

}

export default Navbar 