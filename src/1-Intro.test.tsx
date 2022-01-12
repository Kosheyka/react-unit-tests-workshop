export const calcPrice = (price: number, additionalPrice: number): number => {
    return +(price + additionalPrice).toFixed(2);
};

it('calc price', () => {
    expect(calcPrice(1, 2)).toBe(3);
    expect(calcPrice(0.1, 0.2)).toBe(0.3);
});
