type PriceType = {
  discount: number;
  newPrice: string;
};

export function getPrice(price: string, expirationDate: string): PriceType {
  const discountPercentage = getDiscount(expirationDate);

  // subtract the discounted amount from the original price to get new price
  const actualDiscount = (Number(price) * discountPercentage) / 100;
  const newPrice = Number(price) - actualDiscount;
  return {
    discount: discountPercentage,
    newPrice: newPrice.toString(),
  };
}

function getDiscount(expirationDate: string): number {
  const currDate = new Date();
  const expDate = new Date(JSON.parse(expirationDate));

  // get difference in milliseconds
  const difference = expDate.valueOf() - currDate.valueOf();
  //convert to days
  const daysToExpiration = Math.ceil(difference / (24 * 60 * 60 * 1000));
  console.log(daysToExpiration);

  // if 2 days left: 20% | if 1 day left: 80%
  if (daysToExpiration === 2) return 20;
  if (daysToExpiration <= 1) return 80;

  return 0;
}
