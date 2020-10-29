import { flatMap, range } from 'lodash';
import { Card, CardSuit, CardValue } from './Card';

/** holds an array of cards, which can be shuffled, and cards can be drawn (removed) one at a time. */
export class Deck {

    private _cards: Card[] = [];

    get cards(): Card[] { return this._cards };

    constructor() {
        this.reset();
    }

    reset(): void {
        this._cards = flatMap(
            [CardSuit.Spades, CardSuit.Hearts, CardSuit.Diamonds, CardSuit.Clubs]
                .map(suit => range(CardValue.Ace, CardValue.King + 1) // a number enum so we can use it like numbers
                    .map((value: CardValue) => new Card(value, suit)))
        );
    }

    shuffle(): void {
        let tmp = [...this._cards];
        this._cards = [];
        while (tmp.length > 0) {
            const randIndex = Math.floor(Math.random() * (tmp.length));
            this._cards.push(tmp[randIndex]);
            tmp.splice(randIndex, 1);
        }
    }

    /** draws a card, as in removes and returns it from the top of the deck */
    draw(): Card | null {
        return this._cards.pop() || null;
    }
}