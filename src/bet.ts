import {
    Card,
    CardColor,
    cardID,
    CardSuit,
    CardValue,
    isCardColor,
    isCardID,
    isCardSuit,
    isCardValue,
} from "./cards/Card";

export enum BetType {
    Card = "Card",
    Color = "Color",
    Suit = "Suit",
    Value = "Value",
}

export const betTypeValues = {
    [BetType.Card]: [
        cardID(CardValue.Ace, CardSuit.Clubs),
        cardID(CardValue.Two, CardSuit.Clubs),
        cardID(CardValue.Three, CardSuit.Clubs),
        cardID(CardValue.Four, CardSuit.Clubs),
        cardID(CardValue.Five, CardSuit.Clubs),
        cardID(CardValue.Six, CardSuit.Clubs),
        cardID(CardValue.Seven, CardSuit.Clubs),
        cardID(CardValue.Eight, CardSuit.Clubs),
        cardID(CardValue.Nine, CardSuit.Clubs),
        cardID(CardValue.Ten, CardSuit.Clubs),
        cardID(CardValue.Jack, CardSuit.Clubs),
        cardID(CardValue.Queen, CardSuit.Clubs),
        cardID(CardValue.King, CardSuit.Clubs),

        cardID(CardValue.Ace, CardSuit.Diamonds),
        cardID(CardValue.Two, CardSuit.Diamonds),
        cardID(CardValue.Three, CardSuit.Diamonds),
        cardID(CardValue.Four, CardSuit.Diamonds),
        cardID(CardValue.Five, CardSuit.Diamonds),
        cardID(CardValue.Six, CardSuit.Diamonds),
        cardID(CardValue.Seven, CardSuit.Diamonds),
        cardID(CardValue.Eight, CardSuit.Diamonds),
        cardID(CardValue.Nine, CardSuit.Diamonds),
        cardID(CardValue.Ten, CardSuit.Diamonds),
        cardID(CardValue.Jack, CardSuit.Diamonds),
        cardID(CardValue.Queen, CardSuit.Diamonds),
        cardID(CardValue.King, CardSuit.Diamonds),

        cardID(CardValue.Ace, CardSuit.Hearts),
        cardID(CardValue.Two, CardSuit.Hearts),
        cardID(CardValue.Three, CardSuit.Hearts),
        cardID(CardValue.Four, CardSuit.Hearts),
        cardID(CardValue.Five, CardSuit.Hearts),
        cardID(CardValue.Six, CardSuit.Hearts),
        cardID(CardValue.Seven, CardSuit.Hearts),
        cardID(CardValue.Eight, CardSuit.Hearts),
        cardID(CardValue.Nine, CardSuit.Hearts),
        cardID(CardValue.Ten, CardSuit.Hearts),
        cardID(CardValue.Jack, CardSuit.Hearts),
        cardID(CardValue.Queen, CardSuit.Hearts),
        cardID(CardValue.King, CardSuit.Hearts),

        cardID(CardValue.Ace, CardSuit.Spades),
        cardID(CardValue.Two, CardSuit.Spades),
        cardID(CardValue.Three, CardSuit.Spades),
        cardID(CardValue.Four, CardSuit.Spades),
        cardID(CardValue.Five, CardSuit.Spades),
        cardID(CardValue.Six, CardSuit.Spades),
        cardID(CardValue.Seven, CardSuit.Spades),
        cardID(CardValue.Eight, CardSuit.Spades),
        cardID(CardValue.Nine, CardSuit.Spades),
        cardID(CardValue.Ten, CardSuit.Spades),
        cardID(CardValue.Jack, CardSuit.Spades),
        cardID(CardValue.Queen, CardSuit.Spades),
        cardID(CardValue.King, CardSuit.Spades),
    ] as const,

    [BetType.Color]: [CardColor.Black, CardColor.Red] as const,

    [BetType.Suit]: [CardSuit.Clubs, CardSuit.Diamonds, CardSuit.Hearts, CardSuit.Spades] as const,

    [BetType.Value]: [
        CardValue.Ace,
        CardValue.Two,
        CardValue.Three,
        CardValue.Four,
        CardValue.Five,
        CardValue.Six,
        CardValue.Seven,
        CardValue.Eight,
        CardValue.Nine,
        CardValue.Ten,
        CardValue.Jack,
        CardValue.Queen,
        CardValue.King,
    ] as const,
};

export type BetTypeValue<B extends BetType = BetType> = typeof betTypeValues[B][number];

export const getBetType = (value: BetTypeValue): BetType => {
    if (typeof value === "string") {
        if (isCardColor(value)) {
            return BetType.Color;
        }
        if (isCardSuit(value)) {
            return BetType.Suit;
        }
        if (isCardID(value)) {
            return BetType.Card;
        }
    }
    if (typeof value === "number") {
        if (isCardValue(value)) {
            return BetType.Value;
        }
    }
    throw new Error(`invalid BetTypeValue: ${value}`);
};

export const isMatch = (bet: BetTypeValue, card: Card): boolean => {
    const betType = getBetType(bet);
    switch (betType) {
        case BetType.Card:
            return isCardID(bet) && card.id === bet;
        case BetType.Color:
            return isCardColor(bet) && card.color === bet;
        case BetType.Suit:
            return isCardSuit(bet) && card.suit === bet;
        case BetType.Value:
            return isCardValue(bet) && card.value === bet;
        default:
            throw new Error(`isMatch: invalid bet type ${betType}`);
    }
};

/** the multiplier of the bet, minus house edge. This assumes the bet is not also returned. */
export const getWinMultiplier = (betType: BetType, houseEdge: number): number => {
    const numChoices = betTypeValues[betType].length;
    const weightedNumChoices = numChoices - numChoices * houseEdge; // if 5% house edge, "decrease odds by 5%"
    return weightedNumChoices;
};
