import React, { useEffect } from 'react';
import brandLogo from '../assets/img/brand_logo.png';

const Intro = () => {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById('intro').classList.add('visible');
    }, 500);
  }, []);

  return (
    <div className="intro" id="intro">
      <img src={brandLogo} alt="Logo del Restaurant" />
    </div>
  );
};

export default Intro;
