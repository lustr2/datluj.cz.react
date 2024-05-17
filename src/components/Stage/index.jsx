import React, { useEffect, useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};


const napln = (kolik, words1) => {
  let pocetNaZacatku = kolik;
  while (words1.length < pocetNaZacatku) {
    let newWordStart = generateWord(Math.round(Math.random() * wordList.length));
//    console.log('Nove slovo:' + newWordStart);
    newWordStart && words1.push(newWordStart);
  }
  return words1;
}

const Stage = () => {
  const [words, setWords] = useState(()=> napln(3, [])); //['jahoda']
  const [pocetChyb, setPocetChyb] = useState(5);
  const [active, setActive] = useState(true);
  const [pocetSlov, setPocetSlov] = useState(3);

  useEffect(() => {
    let pocetNaZacatku = pocetSlov;
    while (words.length < pocetNaZacatku) {
      let newWordStart = generateWord(Math.round(Math.random() * 10));
//      console.log('Nove slovo:' + newWordStart);
      newWordStart && words.push(newWordStart);
    }
  });

  const handleFinish = () => {
    let pocet = 0;
    setActive(false);
    let newWord = generateWord(Math.round(Math.random() * 10));
    while ((newWord === null) && (pocet < 100)) {
//      console.log('Nove slovo:' + newWord);
      newWord = generateWord(Math.round(Math.random() * 10));
      pocet++;
    }
    words.shift();
    setWords(w => [...w, newWord]);
  }

  const handleClickFalse = () => {
    let dalsiChyba = pocetChyb - 1;
    setPocetChyb(dalsiChyba);
  };

  const handleClickReset = () => {
//    console.log('Kliknuto na new game');
    setPocetChyb(5);
    setWords(() => napln(pocetSlov, []));
  }

  const handleClickZmena = () => {
//    console.log('Kliknuto na vymen slova');
    setWords(()=> napln( pocetSlov, []));
  }

  const handleClickPlus = () => {
    if (pocetSlov < 10) {
      setPocetSlov(oldPocetSlov => oldPocetSlov + 1);
    } else {
      console.log('Max 10 !!!');
      return;
    }
    let pocet = 0;
    let newWord = generateWord(Math.round(Math.random() * 10));
    while ((newWord === null) && (pocet < 100)) {
//      console.log('Nove slovo:' + newWord);
      newWord = generateWord(Math.round(Math.random() * 10));
      pocet++;
    }
    if (pocet === 100) {
      alert("Neco se nepovedlo ...");
      return;
    }
    setWords(oldWords => [...oldWords, newWord]);
  }

  const handleClickMinus = () => {
    if (pocetSlov > 1) {
      setPocetSlov(oldPocetSlov => oldPocetSlov - 1);
    } else {
      console.log('Min 1 !!!');
      return;
    }
    let ps = pocetSlov-1;
    setWords(oldWords => [...oldWords.slice(0, ps)]);
  }

  return (
    <>
    <div className="stage">
      <table className='table-up'>
        <tbody>
          <tr colSpan='10' height='0px'>
            <td className="spacer"></td><td className="spacer"></td>
            <td className="spacer"></td><td className="spacer"></td>
            <td className="spacer"></td><td className="spacer"></td>
            <td className="spacer"></td><td className="spacer"></td>
            <td className="spacer"></td><td className="spacer"></td>
          </tr>
          <tr>
            <td>
              <button className='button ikonka' title="Pridej pocet slov" type='button' onClick={handleClickPlus} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>Add
              </button>
            </td>
            <td>
              <button className='button ikonka' title="Uber pocet slov" onClick={handleClickMinus}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>Del
              </button>
            </td>
            <td colSpan="7"></td>
            <td className="button ikonka" title="Pocet zivotu"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg> {pocetChyb}
            </td>
          </tr>
          <tr colSpan='10' height='20px'></tr>
          <tr>
            <td colSpan="10">
            { (pocetChyb > 0) ?
              <div className="stage__words">
                {words.map((word, index) => <Wordbox 
                                        word={word} 
                                        key={word} 
                                        onFinish={handleFinish} 
                                        onMistake={handleClickFalse}
                                        active={(index===0) ? true : false} />)}
              </div> 
              :
              <div>
                  <center><b>KONEC</b></center>
              </div>
            }
            </td>
          </tr>
          <tr colSpan='10' height='20px'></tr>
          <tr>
            <td>
              <button className='button ikonka' title="Vymenit slova" onClick={handleClickZmena}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>Change word
              </button>
            </td>
            <td colSpan="8"></td>
            <td> 
              <button className='button ikonka' title="Nova hra" onClick={handleClickReset}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>New game
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Stage;
