import React from 'react';
import projects from '../data/projects';

export default function Projects() {
  return (
    <section id="projects">
      <h2>Мои проекты (закрытые)</h2>
      {projects.map((project, index) => (
        <div key={index} className="project">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noreferrer">
            глянуть
          </a>
        </div>
      ))}
    </section>
  );
}