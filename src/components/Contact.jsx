import React from 'react';

export default function Contact() {
  return (
    <section id="contact">
      <h2>Контакты</h2>
      <p>Связь через:</p>
      <ul className="contacts-list">
        <li>Email: <a href="mailto:me@24jaser.ru">me@24jaser.ru</a></li>
        <li>GitHub: <a href="https://github.com/puskainrestpease" target="_blank" rel="noreferrer">puskainrestpease</a></li>
        <li>Twitch: <a href="https://www.twitch.tv/kikiqzmya" target="_blank" rel="noreferrer">kikiqzmya</a></li>
      </ul>
    </section>
  );
}