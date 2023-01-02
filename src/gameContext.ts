import React, { useContext, useEffect, useReducer, useState } from "react";
import { BetTypeValue, getBetType, getWinMultiplier, isMatch } from "./bet";
import { Card, CardColor } from "./cards/Card";
import { Deck } from "./cards/Deck";

export interface GameState {
    bet: BetTypeValue;
    betAmount: number;
    cards: Deck["cards"];
    /** when different than lastDrawIndex, a useEffect will trigger card drawing and bet result effects */
    drawIndex: number;
    houseEdge: number;
    lastBet: BetTypeValue | null;
    lastBetAmount: number | null;
    lastDrawIndex: number;
    lastDrawnCard: Card | null;
    lastWin: number;
    money: number;
}

export type GameAction =
    | { type: "startDraw" }
    | { type: "setBet"; bet: BetTypeValue }
    | { type: "setBetAmount"; betAmount: number }
    | { type: "finishDraw"; card: Card; restCards: Card[] };

const reducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case "startDraw": {
            if (state.cards.length === 0) {
                return state;
            }
            return {
                ...state,
                drawIndex: state.drawIndex + 1,
            };
        }
        case "finishDraw": {
            if (state.lastDrawIndex === state.drawIndex) {
                return state;
            }
            const bet = state.bet;
            const betAmount = state.betAmount;
            const money = state.money;

            let lastWin = 0;
            let nextMoney = money - betAmount;
            if (isMatch(bet, action.card)) {
                const win = betAmount * getWinMultiplier(getBetType(bet), state.houseEdge);
                nextMoney += win;
                lastWin = win;
            }

            return {
                ...state,
                cards: [...action.restCards],
                lastBet: bet,
                lastBetAmount: betAmount,
                lastDrawnCard: action.card,
                lastDrawIndex: state.drawIndex,
                lastWin,
                money: nextMoney,
            };
        }
        case "setBet":
            return {
                ...state,
                bet: action.bet,
            };
        case "setBetAmount": {
            return {
                ...state,
                betAmount: action.betAmount,
            };
        }

        default:
            return state;
    }
};

export const useGameStateReducer = () => {
    const [deck] = useState(() => {
        const newDeck = new Deck();
        newDeck.shuffle();
        return newDeck;
    });

    const [state, dispatch] = useReducer(reducer, null, () => ({
        bet: CardColor.Black,
        betAmount: 10,
        cards: [...deck.cards],
        drawIndex: 0,
        houseEdge: 0.25,
        lastBet: null,
        lastBetAmount: null,
        lastDrawIndex: 0,
        lastDrawnCard: null,
        lastWin: 0,
        money: 100,
    }));

    useEffect(() => {
        if (state.drawIndex === state.lastDrawIndex) {
            return;
        }
        const card = deck.draw();
        if (!card) {
            return;
        }
        dispatch({ type: "finishDraw", card, restCards: [...deck.cards] });
    }, [state.drawIndex, state.lastDrawIndex, deck]);

    return [state, dispatch] as const;
};

export const GameStateContext = React.createContext<ReturnType<typeof useGameStateReducer> | null>(null);

export const useGameState = () => {
    const ctx = useContext(GameStateContext);
    if (!ctx) {
        throw new Error("need to be used within a GameStateContext.Provider");
    }
    return ctx;
};
