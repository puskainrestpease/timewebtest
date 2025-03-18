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
          <h2>About Me</h2>
          <p>Hi! I'm Maxim, 17 y.o. developer from Moscow</p>
        </section>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;