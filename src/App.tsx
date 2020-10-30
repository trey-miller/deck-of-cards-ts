import React, { useState } from 'react';
import styles from './App.module.scss';
import { Game } from './components/Game';
import { Sandbox } from './components/Sandbox';


type Route = 'Sandbox' | 'Game';

function App() {

  // quick and dirty routing; TODO replace with react router
  const [route, setRoute] = useState<Route>('Game');

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Deck of Cards</h1>
        <nav>
          <ul>
            <li className={route === 'Game' ? styles.selected : ''} onClick={() => setRoute('Game')}>
              Game
            </li>
            <li className={route === 'Sandbox' ? styles.selected : ''} onClick={() => setRoute('Sandbox')}>
              Sandbox
            </li>
          </ul>
        </nav>
      </header>
      {route === 'Sandbox'
        ? (
          <Sandbox />
        ) : (
          <Game />
        )}
    </div>
  );
}

export default App;
