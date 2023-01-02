import { chunk } from "lodash";
import classNames from "classnames";
import React, { ReactNode } from "react";
import { BetTypeValue, getBetType, getWinMultiplier } from "../bet";
import { Card, CardColor, CardSuit, CardValue } from "../cards/Card";
import { Deck } from "../cards/Deck";
import { useGameState } from "../gameContext";
import { CardElem } from "./Card";
import styles from "./Game.module.scss";

/** Four rows of cards, one per suit. Readonly since it's just a reference for the BetChoice cards */
const BET_CARDS: Readonly<Readonly<Card[]>[]> = chunk(new Deck().cards, 13);

export const Game = (): JSX.Element => {
    const [state, dispatch] = useGameState();

    const winMultiplier = getWinMultiplier(getBetType(state.bet), state.houseEdge);

    return (
        <div className={styles.root}>
            <h2>Card Counting Gambler Game</h2>
            <p>
                In this game, you have a deck of cards, which you can draw from, one card at a time. Each draw, you will
                bet on the outcome, by either color, suit, value, or card itself.
            </p>
            <p>
                Each type of bet has different odds. The odds are in favor of the house, as usual. However, if you
                remember what you've seen, you can increase your odds by knowing what cards are left. Good luck!
            </p>
            <div className={styles.row}>
                <div>
                    <h3>Your Money</h3>
                    <div className={styles.money}>${state.money}</div>
                </div>
                {state.lastDrawnCard && (
                    <div className={styles.deckContainer}>
                        Last draw:
                        <div className={styles.deck}>
                            <CardElem card={state.lastDrawnCard} />
                        </div>
                        You {state.lastWin > 0 ? `won $${state.lastWin}` : "lost"}
                    </div>
                )}
                <div className={styles.deckContainer}>
                    Click to draw
                    <div
                        className={styles.deck}
                        onClick={() => {
                            console.log("onClick");
                            dispatch({ type: "startDraw" });
                        }}
                    >
                        <CardElem card={null} faceDown={true} />
                    </div>
                    Cards left: {state.cards.length}
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.bet}>
                    <div className={styles.row}>
                        <div>
                            Bet Amount:&nbsp;
                            <input
                                type="number"
                                name="bet-amount"
                                value={state.betAmount}
                                onChange={e => dispatch({ type: "setBetAmount", betAmount: e.target.valueAsNumber })}
                                min="1"
                                max={state.money}
                            />
                        </div>
                        <div>
                            You're betting&nbsp;
                            <span>
                                ${state.betAmount} on <span>{state.bet}</span>
                            </span>
                            <div>Payout of ${state.betAmount * winMultiplier}</div>
                        </div>
                    </div>
                    <ul className={`${styles.row} ${styles.betChoices}`}>
                        <BetChoice bet={CardColor.Red} color={CardColor.Red}>
                            Red
                        </BetChoice>
                        <BetChoice bet={CardColor.Black} color={CardColor.Black}>
                            Black
                        </BetChoice>
                    </ul>
                    <ul className={`${styles.row} ${styles.betChoices}`}>
                        <BetChoice bet={CardSuit.Clubs} color={CardColor.Black}>
                            {"\u2663"}
                        </BetChoice>
                        <BetChoice bet={CardSuit.Diamonds} color={CardColor.Red}>
                            {"\u2666"}
                        </BetChoice>
                        <BetChoice bet={CardSuit.Hearts} color={CardColor.Red}>
                            {"\u2665"}
                        </BetChoice>
                        <BetChoice bet={CardSuit.Spades} color={CardColor.Black}>
                            {"\u2660"}
                        </BetChoice>
                    </ul>
                    <ul className={`${styles.row} ${styles.betChoices}`}>
                        <BetChoice color={CardColor.Black} bet={CardValue.Ace}>
                            Ace
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Two}>
                            Two
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Three}>
                            Three
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Four}>
                            Four
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Five}>
                            Five
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Six}>
                            Six
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Seven}>
                            Seven
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Eight}>
                            Eight
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Nine}>
                            Nine
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Ten}>
                            Ten
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Jack}>
                            Jack
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.Queen}>
                            Queen
                        </BetChoice>
                        <BetChoice color={CardColor.Black} bet={CardValue.King}>
                            King
                        </BetChoice>
                    </ul>
                    {BET_CARDS.map(row => (
                        <ul className={`${styles.row} ${styles.betChoices} ${styles.cardListContainer}`}>
                            {row.map(card => (
                                <CardBetChoice card={card} />
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface IBetChoiceProps extends React.LiHTMLAttributes<HTMLLIElement> {
    children: ReactNode;
    color?: CardColor;
    bet: BetTypeValue;
}

const BetChoice = ({ color, bet, children, className, onClick, ...liProps }: IBetChoiceProps): JSX.Element => {
    const [gameState, dispatch] = useGameState();
    const selected = gameState.bet === bet;

    return (
        <li
            className={classNames(className, {
                [styles.red]: color === CardColor.Red,
                [styles.black]: color === CardColor.Black,
                [styles.selected]: selected,
            })}
            {...liProps}
            onClick={e => {
                onClick?.(e);
                dispatch({ type: "setBet", bet });
            }}
        >
            {children}
        </li>
    );
};
interface ICardBetChoiceProps {
    card: Card;
}
const CardBetChoice = ({ card }: ICardBetChoiceProps) => {
    const [gameState] = useGameState();
    const selected = gameState.bet === card.id;
    return (
        <BetChoice
            key={card.unicodeNumber}
            className={styles.cardContainer}
            title={card.name}
            color={card.color}
            bet={card.id}
        >
            <CardElem card={card} invertColor={selected} />
        </BetChoice>
    );
};
