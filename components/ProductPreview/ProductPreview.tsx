import React from "react";
import { ProductTypeNoId } from "../../types";

const ProductPreview: React.FC<ProductTypeNoId> = ({
  prodName,
  price,
  quantity,
  image,
  date,
  ingredientList,
}) => {
  return (
    <div className="product-preview">
      <h2>Anteprima del prodotto</h2>
      <p>Nome del prodotto: {prodName}</p>
      <p>Prezzo: {price}</p>
      <p>Quantità: {quantity}</p>
      <p>Immagine: {image}</p>
      <p>Data di preparazione: {date.split("-").reverse().join("/")}</p>
      <span className="ingredient-list">
        <p>Lista degli ingredienti: </p>
        <ul className="ingredients">
          {ingredientList.map((el, i) => (
            <li key={i}>{el},</li>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default ProductPreview;
