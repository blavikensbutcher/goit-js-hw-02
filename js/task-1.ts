const makeTransaction = (
  quantity: number,
  pricePerDroid: number,
  customerCredits: number
): string => {
  const totalPrice = quantity * pricePerDroid;

  if (totalPrice > customerCredits) {
    return "Insufficient funds!";
  }

  return `You ordered ${quantity} droids worth ${totalPrice} credits`;
};

const validate = (
  fn: (
    quantity: number,
    pricePerDroid: number,
    customerCredits: number
  ) => string
) => {
  return (quantity: number, pricePerDroid: number, customerCredits: number) => {
    if (quantity <= 0) {
      throw new Error(`Quantity can't be less than or equal to 0`);
    }
    if (pricePerDroid <= 0) {
      throw new Error(`Price per droid can't be less than or equal to 0`);
    }

    return fn(quantity, pricePerDroid, customerCredits);
  };
};

const safeTransaction = validate(makeTransaction);

console.log(safeTransaction(5, 3000, 23000)); // "You ordered 5 droids worth 15000 credits!"
console.log(safeTransaction(3, 1000, 15000)); // "You ordered 3 droids worth 3000 credits!"
console.log(safeTransaction(10, 5000, 8000)); // "Insufficient funds!"
console.log(safeTransaction(8, 2000, 10000)); // "Insufficient funds!"
console.log(safeTransaction(10, 500, 5000)); // "You ordered 10 droids worth 5000 credits!"
console.log(safeTransaction(0, 500, 5000)); // "Quantity can't be less than or equal to 0"
console.log(safeTransaction(10, -1, 5000)); // "Price per droid can't be less than or equal to 0"
