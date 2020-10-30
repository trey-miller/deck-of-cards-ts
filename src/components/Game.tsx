import { chunk } from 'lodash';
import React, { ReactNode, useRef } from 'react';
import { Card } from '../cards/Card';
import { Deck } from '../cards/Deck';
import { CardElem } from './Card';
import styles from './Game.module.scss';


enum BetType {
    Color,
    Suit,
    Value,
    Card,
}

/** Four rows of cards, one per suit. Readonly since it's just a reference for the BetChoice cards */
const BET_CARDS: Readonly<Readonly<Card[]>[]> = chunk(new Deck().cards, 13);

export const Game = (): JSX.Element => {

    const deck = useRef(new Deck());


    return (
        <div className={styles.root}>
            <h2>Card Counting Gambler Game</h2>
            <p>
                In this game, you have a deck of cards, which you can draw from, one card at a time.
                Each draw, you will bet on the outcome, by either color, suit, value, or card itself.
            </p>
            <p>
                Each type of bet has different odds. The odds are in favor of the house, as usual.
                However, if you remember what you've seen, you can increase your odds by knowing what
                cards are left. Good luck!
            </p>
            <div className={styles.row}>
                <div>
                    <h3>Your Money</h3>
                    <div className={styles.money}>$100</div>
                </div>
                <div className={styles.deckContainer}>
                    Click to draw
                    <div className={styles.deck}>
                        <CardElem card={null} faceDown={true} />
                    </div>
                    Cards left: 52
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.bet}>
                    <div className={styles.row}>
                        <div>
                            Bet Amount:&nbsp;
                            <input type="number" name="bet-amount" value={10} min="1" max="1000" />
                        </div>
                        <div>
                            You're betting&nbsp;
                            <span>
                                $10 on
                                <span className={styles.red}> {'\u2665'} Hearts</span>
                            </span>
                            <div>Win gains $30</div>
                        </div>
                    </div>
                    <ul className={`${styles.row} ${styles.betChoices}`}>
                        <BetChoice color={'red'}>Red</BetChoice>
                        <BetChoice color={'black'}>Black</BetChoice>
                    </ul>
                    <ul className={`${styles.row} ${styles.betChoices}`}>
                        <BetChoice color={'black'}>{'\u2660'}</BetChoice>
                        <BetChoice color={'red'} selected={true}>{'\u2665'}</BetChoice>
                        <BetChoice color={'red'}>{'\u2666'}</BetChoice>
                        <BetChoice color={'black'}>{'\u2663'}</BetChoice>
                    </ul>
                    <ul className={`${styles.row} ${styles.betChoices}`}>
                        <BetChoice>Ace</BetChoice>
                        <BetChoice>Two</BetChoice>
                        <BetChoice>Three</BetChoice>
                        <BetChoice>Four</BetChoice>
                        <BetChoice>Five</BetChoice>
                        <BetChoice>Six</BetChoice>
                        <BetChoice>Seven</BetChoice>
                        <BetChoice>Eight</BetChoice>
                        <BetChoice>Nine</BetChoice>
                        <BetChoice>Ten</BetChoice>
                        <BetChoice>Jack</BetChoice>
                        <BetChoice>Queen</BetChoice>
                        <BetChoice>King</BetChoice>
                    </ul>
                    {BET_CARDS.map(row => (
                        <ul className={`${styles.row} ${styles.betChoices} ${styles.cardListContainer}`}>
                            {row.map(card => (
                                <BetChoice
                                    key={card.unicodeNumber}
                                    className={styles.cardContainer}
                                    title={card.name}
                                    color={card.color}
                                >
                                    <CardElem card={card} />
                                </BetChoice>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface IBetChoiceProps extends React.LiHTMLAttributes<HTMLLIElement> {
    children: ReactNode;
    color?: 'red' | 'black';
    selected?: boolean;
    //onSelect: (value: string) => void;
}

const BetChoice = ({ color, selected, children, className, ...liProps }: IBetChoiceProps): JSX.Element => {
    const classNames: string[] = [];
    if (className)
        classNames.push(className);
    if (color) {
        classNames.push(color === 'red' ? styles.red : styles.black);
    }
    if (selected) {
        classNames.push(styles.selected);
    }
    return (
        <li className={classNames.join(' ')} {...liProps}>
            {children}
        </li>
    )
}