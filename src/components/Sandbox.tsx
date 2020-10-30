import React, { useCallback, useRef, useState } from 'react';
import { Card } from '../cards/Card';
import { Deck } from '../cards/Deck';
import { CardElem } from './Card';
import styles from './Sandbox.module.scss';


export const Sandbox = (): JSX.Element => {
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
    }, []);
    const toggleFaceDown = useCallback(() => {
        setFaceDown(f => !f);
    }, []);
    return (
        <div className={styles.root}>
            <h2>Here is a deck of cards.</h2>
            <div>
                <button onClick={reset}>Reset</button>
                <button onClick={shuffle}>Shuffle</button>
                <button onClick={toggleFaceDown}>{faceDown ? 'Reveal' : 'Hide'}</button>
                <button onClick={draw}>Draw Card</button>
            </div>
            <p className={styles.activeCards}>
                {drawnCard && (
                    <div>
                        <div>Drawn card:</div>
                        <div className={styles.drawnCard}><CardElem card={drawnCard} /></div>
                        <div>{drawnCard.name}</div>
                    </div>
                )}
                {selectedCard && (

                    <div>
                        <div>Selected card:</div>
                        <div className={styles.drawnCard}><CardElem card={selectedCard} /></div>
                        <div>{selectedCard.name}</div>
                    </div>
                )}
            </p>
            <div>

                <ul className={styles.cardList}>
                    {deck.current.cards.map((card, i) => (
                        <React.Fragment key={card.unicodeNumber}>
                            <li
                                className={styles.card + (card.unicodeNumber === selectedCard?.unicodeNumber ? ' ' + styles.selected : '')}
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
        </div>
    )
}