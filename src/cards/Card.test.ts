import { Card, CardSuit, CardValue } from './Card';

describe('Deck tests', () => {
    test('Card name is correct.', () => {
        const card = new Card(CardValue.Ace, CardSuit.Spades);
        expect(card.valueName).toEqual('Ace');
        expect(card.suit).toEqual('Spades');
        expect(card.name).toEqual('Ace of Spades');

        const card2 = new Card(CardValue.Three, CardSuit.Clubs);
        expect(card2.valueName).toEqual('Three');
        expect(card2.suit).toEqual('Clubs');
        expect(card2.name).toEqual('Three of Clubs');
    });

    test('Card suit color is correct.', () => {
        const heart = new Card(CardValue.Ace, CardSuit.Hearts);
        expect(heart.color).toEqual('red');
        const diamond = new Card(CardValue.Nine, CardSuit.Diamonds);
        expect(diamond.color).toEqual('red');
        const spade = new Card(CardValue.King, CardSuit.Spades);
        expect(spade.color).toEqual('black');
        const club = new Card(CardValue.Three, CardSuit.Clubs);
        expect(club.color).toEqual('black');
    });

    test('Card unicode is correct.', () => {
        const ace = new Card(CardValue.Ace, CardSuit.Spades);
        expect(ace.unicodeNumber).toEqual(0x1F0A1);
        expect(ace.unicode).toEqual('🂡');

        const jack = new Card(CardValue.Jack, CardSuit.Clubs);
        expect(jack.unicodeNumber).toEqual(0x1F0DB);
        expect(jack.unicode).toEqual('🃛');
        
        const queen = new Card(CardValue.Queen, CardSuit.Hearts);
        expect(queen.unicodeNumber).toEqual(0x1F0BD);
        expect(queen.unicode).toEqual('🂽');

        const king = new Card(CardValue.King, CardSuit.Hearts);
        expect(king.unicodeNumber).toEqual(0x1F0BE);
        expect(king.unicode).toEqual('🂾');
        
        const three = new Card(CardValue.Three, CardSuit.Diamonds);
        expect(three.unicodeNumber).toEqual(0x1F0C3);
        expect(three.unicode).toEqual('🃃');
    })
});