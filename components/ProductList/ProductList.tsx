import Image from "next/image";
import React from "react";
import { ProductType } from "../../types";

type Props = {
  allProducts: ProductType[];
  setAllProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setPopupMessage: React.Dispatch<React.SetStateAction<string>>;
  setProdName: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setQuantity: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setIngredientList: React.Dispatch<React.SetStateAction<string[]>>;
  setEditingId: React.Dispatch<React.SetStateAction<string>>;
};

const ProductList: React.FC<Props> = ({
  allProducts,
  setAllProducts,
  setPopupMessage,
  setProdName,
  setPrice,
  setQuantity,
  setImage,
  setDate,
  setIngredientList,
  setEditingId,
}) => {
  async function handleDeleteOne(id: string) {
    const req = await fetch("/api/delete-product", {
      method: "DELETE",
      body: id,
    });
    if (req.ok) {
      setPopupMessage("Il prodotto è stato eliminato correttamente!");
      setAllProducts((prev) => prev.filter((el) => el.id !== id));
    } else {
      setPopupMessage("C'è stato un problema con la rimozione, riprovare");
    }
  }
  async function handleEdit(data: ProductType) {
    setProdName(data.prodName);
    setPrice(data.price);
    setQuantity(data.quantity);
    setImage(data.image);
    setDate(data.date);
    setIngredientList(data.ingredientList);
    setEditingId(data.id);
  }

  return (
    <div className="product-list">
      <h2>Lista prodotti caricati</h2>
      <div className="products">
        {allProducts.map((el) => (
          <article className="list-item-dolce" key={el.id}>
            <div className="left">
              <Image src={el.image} alt={el.prodName} width="50" height="50" />
              <div className="info">
                <p>{el.prodName}, </p>
                <p>{el.price}€, </p>
                <p>x{el.quantity} </p>
                <p>{el.date.split("-").reverse().join("/")},</p>
                <p>
                  Ingredienti:{" "}
                  {el.ingredientList.map(
                    (el) => el.split(":")[0].toLowerCase() + ", "
                  )}
                </p>
              </div>
            </div>
            <div className="right">
              <button onClick={() => handleEdit(el)} className="edit">
                Modifica
              </button>
              <button onClick={() => handleDeleteOne(el.id)} className="delete">
                Elimina
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
