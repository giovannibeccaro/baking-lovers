import Image from "next/image";
import React from "react";
import { ProductType } from "../../types";

const SingleDolce: React.FC<ProductType> = ({
  prodName,
  price,
  quantity,
  image,
  date,
  ingredientList,
}) => {
  return (
    <article className="single-dolce">
      <Image src={image} alt={prodName} width="200" height="280" />
      <div className="info">
        <p className="prod-name">{prodName}</p>
        <div className="second-layer">
          <p className="price">{price}€</p>
          <p className="quantity">x{quantity}</p>
        </div>
      </div>
    </article>
  );
};

export default SingleDolce;
