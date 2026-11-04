export function calculateDiscount(price) {
    if (price > 100) {
        return price - (price * 0.1);
    }
    if (price < 20)
    {
        return price;
    }
    return parseFloat(price - (price * 0.05));
}
