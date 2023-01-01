import React, { useContext, useReducer } from "react";
import { BetTypeValue } from "./bet";
import { CardColor } from "./cards/Card";

export interface GameState {
    bet: BetTypeValue;
}

export type GameAction = { type: "draw" } | { type: "setBet"; bet: BetTypeValue };

const gameStateReducer = (state: GameState, action: GameAction) => {
    switch (action.type) {
        case "draw":
            return state; // TODO
        case "setBet":
            return {
                ...state,
                bet: action.bet,
            };
        default:
            return state;
    }
};

export const useGameStateReducer = () => {
    const [state, dispatch] = useReducer(gameStateReducer, {
        bet: CardColor.Black,
    });

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
