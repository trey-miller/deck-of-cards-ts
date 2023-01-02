import { BetType, getWinMultiplier } from "./bet";

describe("bet", () => {
    describe("getWinMultiplier", () => {
        expect(getWinMultiplier(BetType.Card, 0.05)).toMatchInlineSnapshot(`49.4`);
        expect(getWinMultiplier(BetType.Color, 0.05)).toMatchInlineSnapshot(`1.9`);
        expect(getWinMultiplier(BetType.Suit, 0.05)).toMatchInlineSnapshot(`3.8`);
        expect(getWinMultiplier(BetType.Value, 0.05)).toMatchInlineSnapshot(`12.35`);

        expect(getWinMultiplier(BetType.Card, 0.25)).toMatchInlineSnapshot(`39`);
        expect(getWinMultiplier(BetType.Color, 0.25)).toMatchInlineSnapshot(`1.5`);
        expect(getWinMultiplier(BetType.Suit, 0.25)).toMatchInlineSnapshot(`3`);
        expect(getWinMultiplier(BetType.Value, 0.25)).toMatchInlineSnapshot(`9.75`);
    });
});
