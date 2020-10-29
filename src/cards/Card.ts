
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
};

export enum CardSuit {
    Clubs = 'Clubs',
    Diamonds = 'Diamonds',
    Hearts = 'Hearts',
    Spades = 'Spades',
}

export type SuitColor = 'red' | 'black';

export class Card {

    readonly value: CardValue;
    readonly suit: CardSuit;
    readonly name: string;

    get valueName(): string { return CardValue[this.value]; };
    get suitName(): string { return this.suit; };
    get color(): SuitColor {
        switch (this.suit) {
            case CardSuit.Clubs:
            case CardSuit.Spades:
                return 'black';
            case CardSuit.Hearts:
            case CardSuit.Diamonds:
                return 'red';
            default:
                throw new Error('Invalid suit: ' + this.suit);
        }
    };
    /** returns the unicode card block character, see https://en.wikipedia.org/wiki/Playing_cards_in_Unicode */
    get unicode(): string {
        return String.fromCodePoint(this.unicodeNumber);
    }

    get unicodeNumber(): number {
        return 0x1F000 + this.unicodeSuitNumber + this.unicodeValueNumber;
    }

    get unicodeSuitNumber(): number {
        switch (this.suit) {
            case CardSuit.Spades:
                return 0xA0;
            case CardSuit.Hearts:
                return 0xB0;
            case CardSuit.Diamonds:
                return 0xC0;
            case CardSuit.Clubs:
                return 0xD0;
            default:
                return 0;
        }
    }

    get unicodeValueNumber(): number {
        // 0x1F0xC is a Knight, which we don't use
        return this.value > 0xB ? this.value + 1 : this.value;
    }

    constructor(value: CardValue, suit: CardSuit) {
        this.value = value;
        this.suit = suit;
        this.name = `${this.valueName} of ${this.suit}`;
    }
}
