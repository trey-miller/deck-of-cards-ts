export enum CardValue {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
}

export enum CardSuit {
    Clubs = "Clubs",
    Diamonds = "Diamonds",
    Hearts = "Hearts",
    Spades = "Spades",
}

export enum CardColor {
    Red = "Red",
    Black = "Black",
}

export const cardID = <V extends CardValue, S extends CardSuit>(value: V, suit: S) => `${value}:${suit}` as const;

export type CardID<V extends CardValue = CardValue, S extends CardSuit = CardSuit> = ReturnType<typeof cardID<V, S>>;

export class Card<V extends CardValue = CardValue, S extends CardSuit = CardSuit> {
    readonly value: V;
    readonly suit: S;
    readonly id: CardID<V, S>;
    readonly name: string;

    get valueName(): string {
        return CardValue[this.value];
    }
    get suitName(): string {
        return this.suit;
    }
    get color(): CardColor {
        switch (this.suit) {
            case CardSuit.Clubs:
            case CardSuit.Spades:
                return CardColor.Black;
            case CardSuit.Hearts:
            case CardSuit.Diamonds:
                return CardColor.Red;
            default:
                throw new Error("Invalid suit: " + this.suit);
        }
    }
    /** returns the unicode card block character, see https://en.wikipedia.org/wiki/Playing_cards_in_Unicode */
    get unicode(): string {
        return String.fromCodePoint(this.unicodeNumber);
    }

    get unicodeNumber(): number {
        return 0x1f000 + this.unicodeSuitNumber + this.unicodeValueNumber;
    }

    get unicodeSuitNumber(): number {
        switch (this.suit) {
            case CardSuit.Spades:
                return 0xa0;
            case CardSuit.Hearts:
                return 0xb0;
            case CardSuit.Diamonds:
                return 0xc0;
            case CardSuit.Clubs:
                return 0xd0;
            default:
                return 0;
        }
    }

    get unicodeValueNumber(): number {
        // 0x1F0xC is a Knight, which we don't use
        return this.value > 0xb ? this.value + 1 : this.value;
    }

    constructor(value: V, suit: S) {
        this.value = value;
        this.suit = suit;
        this.id = cardID(value, suit);
        this.name = `${this.valueName} of ${this.suit}`;
    }
}
