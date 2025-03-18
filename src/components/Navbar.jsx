import React from 'react';
import { Link } from 'react-scroll';

export default function Navbar() {
  return (
    <nav>
      <ul className="nav-links">
        <li><Link to="about" smooth={true} duration={500}>About</Link></li>
        <li><Link to="projects" smooth={true} duration={500}>Projects</Link></li>
        <li><Link to="contact" smooth={true} duration={500}>Contact</Link></li>
      </ul>
    </nav>
  );
}