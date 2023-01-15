import Image from "next/image";
import React, { useState } from "react";
import { ProductType } from "../../types";
import { getPrice } from "../../utils/getDiscount";

const SingleDolce: React.FC<ProductType> = ({
  prodName,
  price,
  quantity,
  image,
  ingredientList,
  expirationDate,
}) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const discountedPrice = getPrice(price, expirationDate);

  return (
    <article
      onClick={() => setShowIngredients(!showIngredients)}
      className={`${showIngredients ? "single-dolce" : "single-dolce"}`}
    >
      {showIngredients ? (
        <div className="ingredients-cardback">
          {ingredientList.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </div>
      ) : (
        <>
          <Image src={image} alt={prodName} width="200" height="280" />
          <div className="info">
            <p className="prod-name">{prodName}</p>
            <div className="second-layer">
              {discountedPrice.discount ? (
                <p className="price">
                  <span className="old-price">{price}€</span>
                  <sup className="discount">
                    {discountedPrice.discount}%
                  </sup>{" "}
                  {discountedPrice.newPrice}€
                </p>
              ) : (
                <p className="price">{price}€</p>
              )}

              <p className="quantity">x{quantity}</p>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default SingleDolce;
