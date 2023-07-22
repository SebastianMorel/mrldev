import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [animate, setAnimate] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
      const nameTimer = setTimeout(() => {
        setShowName(true);
        const titleTimer = setTimeout(() => {
          setShowTitle(true);
          const socialTimer = setTimeout(() => {
            setShowSocial(true);
            const projectsTimer = setTimeout(() => {
              setShowProjects(true);
            }, 1000);
            return () => clearTimeout(projectsTimer);
          }, 1000);
          return () => clearTimeout(socialTimer);
        }, 1000);
        return () => clearTimeout(titleTimer);
      }, 1000);
      return () => clearTimeout(nameTimer);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('mc.mrl.dev:25597');
  
    const otherLinks = document.querySelectorAll('.project-name:not(:hover)');
    otherLinks.forEach(link => link.style.pointerEvents = 'none');
  
    setShowMessage(true);
  
    setTimeout(() => {
      setShowMessage(false);
      otherLinks.forEach(link => link.style.pointerEvents = '');
    }, 1000);
  };

  return (
    <div className={`logo-container ${animate ? 'animate' : ''}`}>
      <div className="letter">m</div>
      <div className="hidden letter">o</div>
      <div className="letter r-adjust">r</div>
      <div className="hidden letter">e</div>
      <div className="letter">l</div>
      <div className="dev">.dev</div>
      <div className={`name ${showName ? 'show-name' : ''}`}>sebastian</div>
      <div className={`title ${showTitle ? 'show-title' : ''}`}>M.Sc. Industrial Management</div>
      <div className={`social-links ${showSocial ? 'show-social' : ''}`}>
        <a href="https://github.com/SebastianMorel" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/morels/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:sebastian.morel@hotmail.se?subject=mrl.dev | <subject>">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <div className={`projects ${showProjects ? 'show-projects' : ''}`}>
          <span className="project-title">&gt;projects</span>
          <div className="project">
            <a href="https://stat.mrl.dev/" target="_blank" rel="noopener noreferrer">
                <span className="project-name">&gt;&gt;<span className="highlight">stat.</span><span className="normal-color">mrl.dev</span></span>
            </a> probability calculators
            <br></br>
            <a href="#" onClick={copyToClipboard} className="project-name">
              &gt;&gt;<span className="highlight">mc.</span><span className="normal-color">mrl.dev</span>
              <span className={`clipboard-message ${showMessage ? 'show-message' : ''}`}>Copied to clipboard!</span>
            </a> minecraft server [WIP]
            <br></br>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="project-name">&gt;&gt;<span className="highlight">img.</span><span className="normal-color">mrl.dev</span></span>
            </a> image storage [WIP]
        </div>
      </div>
    </div>
  );
}

export default App;