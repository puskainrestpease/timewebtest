import React from 'react';
import { Link } from 'react-scroll';

export default function Navbar() {
  return (
    <nav>
      <ul className="nav-links">
        <li><Link to="about" smooth duration={500}>Кто я</Link></li>
        <li><Link to="projects" smooth duration={500}>Проекты</Link></li>
        <li><Link to="contact" smooth duration={500}>Контакты</Link></li>
      </ul>
    </nav>
  );
}