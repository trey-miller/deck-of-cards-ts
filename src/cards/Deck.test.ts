import { Deck } from './Deck';

describe('Deck tests', () => {
    test('Deck has 52 cards.', () => {
        const deck = new Deck();
        expect(deck.cards.length).toEqual(52);
    });
    test('Deck has all unique cards.', () => {
        const deck = new Deck();
        const seenCardNames: Set<string> = new Set();
        for (const card of deck.cards) {
            expect(seenCardNames.has(card.name)).toEqual(false);
            seenCardNames.add(card.name);
        }
    });
    test('Deck draw removes card and returns null if none are left.', () => {
        const deck = new Deck();
        const card = deck.draw();
        expect(card).not.toBeNull();
        expect(deck.cards.length).toEqual(51);
        for (let i = 0; i < 51; i++) {
            expect(deck.draw()).not.toBeNull();
        }
        expect(deck.cards.length).toEqual(0);
        expect(deck.draw()).toBeNull();
    });
    test('Deck shuffle maintains the same cards.', () => {
        const deck = new Deck();
        expect(deck.cards.length).toEqual(52);

        deck.shuffle();
        deck.shuffle();
        deck.shuffle();
        expect(deck.cards.length).toEqual(52);

        const drawn = deck.draw();
        expect(deck.cards.length).toEqual(51);
        deck.shuffle();
        expect(deck.cards.length).toEqual(51);
        expect(deck.cards).not.toContainEqual(drawn);

    });
    test('Deck shuffle is unique.', () => {
        const deck1 = new Deck();
        const deck2 = new Deck();

        expect(deck1).toEqual(deck2);

        deck1.shuffle();
        expect(deck1).not.toEqual(deck2);

        const shuffle1 = [...deck1.cards];
        deck1.shuffle();
        const shuffle2 = [...deck1.cards];
        deck2.shuffle();
        const [shuffle3] = [...deck2.cards];

        expect(shuffle1).not.toEqual(shuffle2);
        expect(shuffle2).not.toEqual(shuffle3);
        expect(shuffle1).not.toEqual(shuffle3);

        // edge case - first and last cards change too
        const firstCards = new Set<number>();
        const lastCards = new Set<number>();
        for (let i = 0; i < 10; i++) {
            deck1.shuffle();
            firstCards.add(deck1.cards[0].unicodeNumber);
            lastCards.add(deck1.cards[deck1.cards.length - 1].unicodeNumber);
        }
        expect(firstCards.size).toBeGreaterThan(1);
        expect(lastCards.size).toBeGreaterThan(1);
    });
});