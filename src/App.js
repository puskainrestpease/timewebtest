import React from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <section id="about">
          <h2>About me</h2>
          <p>Меня зовут Максим, в данный момент являюсь студентом колледжа. Учусь :0</p>
        </section>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;