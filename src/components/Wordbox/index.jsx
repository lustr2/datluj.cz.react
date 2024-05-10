import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState(word);  
  
  const handleKeyUp = (e) => {
    let slovo = '';
    slovo = lettersLeft;
    if (e.key === slovo.charAt(0)) {
      console.log("Stisknuto: " + e.key);
      slovo = slovo.substring(1, slovo.length);
      setLettersLeft(slovo);
    }
    if (slovo.length === 0) {
//      setLettersLeft(word);
      onFinish();
    }
  }

  useEffect (() => {
    document.addEventListener('keydown', handleKeyUp);
    return () => document.removeEventListener('keydown', handleKeyUp);
    }, [handleKeyUp]);

  return (
    <div className="wordbox"
          onKeyDown={handleKeyUp}>
        {lettersLeft}
    </div>
  );
};

export default Wordbox;
