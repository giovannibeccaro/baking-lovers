import React, { useState } from "react";
import FormComponent from "../../components/FormComponent/FormComponent";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import { inputErrors } from "../../utils/inputErrors";

const Admin = () => {
  // setting product states
  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  // error state when some field is invalid
  const [error, setError] = useState<string[]>([]);
  // message that pops up when user uploads product
  const [popupMessage, setPopupMessage] = useState<string>("");

  return (
    <main className="main-admin">
      <h1>Pannello di controllo amministratore</h1>
      {popupMessage.length > 0 && (
        <PopupMessage message={popupMessage} setMessage={setPopupMessage} />
      )}
      {error.length
        ? error.map((el) => (
            <p className="error-message" key={el}>
              {inputErrors[el as keyof typeof inputErrors]}
            </p>
          ))
        : null}
      <section className="add-new-product">
        <FormComponent
          prodName={prodName}
          price={price}
          quantity={quantity}
          image={image}
          date={date}
          ingredientList={ingredientList}
          ingredient={ingredient}
          ingredientQuantity={ingredientQuantity}
          error={error}
          popupMessage={popupMessage}
          setProdName={setProdName}
          setPrice={setPrice}
          setQuantity={setQuantity}
          setImage={setImage}
          setDate={setDate}
          setIngredientList={setIngredientList}
          setIngredient={setIngredient}
          setIngredientQuantity={setIngredientQuantity}
          setError={setError}
          setPopupMessage={setPopupMessage}
        />
        <ProductPreview
          prodName={prodName}
          price={price}
          quantity={quantity}
          image={image}
          date={date}
          ingredientList={ingredientList}
        />
      </section>
    </main>
  );
};

export default Admin;
