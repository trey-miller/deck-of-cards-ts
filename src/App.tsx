import React, { useCallback, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Deck } from './cards/Deck';
import { Card } from './cards/Card';
import { CardElem } from './components/Card';

function App() {

  const deck = useRef(new Deck());
  const [changeTimes, setChangeTimes] = useState(0); // forces re-render for when deck changes
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [drawnCard, setDrawnCard] = useState<Card | null>(null);

  const [faceDown, setFaceDown] = useState(true);

  const shuffle = useCallback(() => {
    deck.current.shuffle();
    setChangeTimes(s => s + 1);
    setSelectedCard(null);
  }, []);
  const reset = useCallback(() => {
    deck.current.reset();
    setChangeTimes(s => s + 1);
    setSelectedCard(null);
    setDrawnCard(null);
  }, []);
  const draw = useCallback(() => {
    setDrawnCard(deck.current.draw());
    setChangeTimes(s => s + 1);
    setSelectedCard(null);
  }, []);
  const toggleFaceDown = useCallback(() => {
    setFaceDown(f => !f);
    setSelectedCard(null);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        Here is a deck of cards.
        <button onClick={shuffle}>Shuffle</button>
        <button onClick={reset}>Reset</button>
        <button onClick={toggleFaceDown}>{faceDown ? 'Reveal' : 'Hide'}</button>
        <button onClick={draw}>Draw Card</button>
        <p className="App-active-cards">
          {drawnCard && (
            <div className="App-drawn-card-side">
              <div>Drawn card:</div>
              <div className="App-drawn-card"><CardElem card={drawnCard} /></div>     
              <div>{drawnCard.name}</div>         
            </div>
          )}
          {selectedCard
            ? <span>Selected card: {selectedCard?.name}</span>
            : <span>No card selected.</span>
          }
        </p>
        <div>

          <ul className="App-card-list">
            {deck.current.cards.map((card, i) => (
              <React.Fragment key={card.unicodeNumber}>
                <li
                  className={'App-card' + (card.unicodeNumber === selectedCard?.unicodeNumber ? ' App-card-selected' : '')}
                  key={card.name}
                  onClick={() => setSelectedCard(card)}
                >
                  <CardElem card={card} faceDown={faceDown} />
                </li>
                {i % 13 === 12 && <br />}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
