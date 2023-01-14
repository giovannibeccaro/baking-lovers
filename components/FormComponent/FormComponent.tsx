import React, { useEffect } from "react";
import IngredientsInput from "../IngredientsInput/IngredientsInput";
import { DataType, ProductType } from "../../types";

type Props = {
  prodName: string;
  price: string;
  quantity: string;
  image: string;
  date: string;
  ingredientList: string[];
  ingredient: string;
  ingredientQuantity: string;
  error: string[];
  popupMessage: string;
  setProdName: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setQuantity: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setIngredient: React.Dispatch<React.SetStateAction<string>>;
  setIngredientQuantity: React.Dispatch<React.SetStateAction<string>>;
  setIngredientList: React.Dispatch<React.SetStateAction<string[]>>;
  setError: React.Dispatch<React.SetStateAction<string[]>>;
  setPopupMessage: React.Dispatch<React.SetStateAction<string>>;
  setAllProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  editingId: string;
  setEditingId: React.Dispatch<React.SetStateAction<string>>;
};

const FormComponent: React.FC<Props> = ({
  prodName,
  price,
  quantity,
  image,
  date,
  ingredient,
  ingredientQuantity,
  ingredientList,
  error,
  popupMessage,
  setProdName,
  setPrice,
  setQuantity,
  setImage,
  setDate,
  setIngredient,
  setIngredientQuantity,
  setIngredientList,
  setError,
  setPopupMessage,
  setAllProducts,
  editingId,
  setEditingId,
}) => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let errorFlag = false; // this will be updated if something goes wrong, thus exiting the function

    setError([]); // this resets the error message from previous attempts

    // little helper function to avoid repetitions
    function setErrorHelper(error: string) {
      setError((prev) => [...prev, error]);
      errorFlag = true;
    }

    //? error handling before submitting
    if (prodName.length < 1) {
      setErrorHelper("prodName");
    }
    if (price.length < 1) {
      setErrorHelper("price");
    }
    if (quantity.length < 1) {
      setErrorHelper("quantity");
    }
    if (image.length < 1 || image.indexOf("http") === -1) {
      setErrorHelper("image");
    }
    if (date.length < 1) {
      setErrorHelper("date");
    }
    if (ingredientList.length < 1) {
      setErrorHelper("ingredientList");
    }
    if (errorFlag) return;

    //finally, if there is no error, post request and clear fields
    if (editingId) {
      updateRequest();
    } else {
      postRequest();
    }

    handleReset();
  }

  function handleReset() {
    setProdName("");
    setPrice("");
    setQuantity("");
    setImage("");
    setDate("");
    setIngredient("");
    setIngredientQuantity("");
    setIngredientList([]);
  }

  async function postRequest() {
    const data = {
      prodName,
      price,
      quantity,
      image,
      date,
      ingredientList,
      id: new Date().getTime().toString(),
    } as ProductType;
    // yeah, not the best practice in the world to create an Id based on the current date milliseconds, but this isn't a real world project, so I think we'll be fine
    const req = await fetch("/api/new-product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (req.ok) {
      setPopupMessage("Il prodotto è stato inserito con successo!");
      setAllProducts((prev) => [...prev, data]);
    } else {
      setPopupMessage("C'è stato un problema con il caricamento, riprovare");
    }
  }

  async function updateRequest() {
    const data = {
      prodName,
      price,
      quantity,
      image,
      date,
      ingredientList,
      id: editingId,
    } as ProductType;
    const req = await fetch("/api/edit-product", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (req.ok) {
      setPopupMessage("Il prodotto è stato modificato con successo!");
      setAllProducts((prev) =>
        prev.map((el) => {
          if (el.id === editingId) {
            return data;
          }
          return el;
        })
      );
    } else {
      setPopupMessage("C'è stato un problema con la modifica, riprovare");
    }
  }

  return (
    <form action="submit" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="name">
        Nome del prodotto
        <input
          className={`${error.includes("prodName") ? "error" : ""}`}
          type="text"
          name="name"
          placeholder="Torta paradiso, cheesecake..."
          value={prodName}
          onClick={() =>
            setError((prev) => prev.filter((el) => el !== "prodName"))
          }
          onChange={(e) => setProdName(e.target.value)}
        />
      </label>
      <label htmlFor="prezzo">
        Prezzo
        <input
          className={`${error.includes("price") ? "error" : ""}`}
          type="number"
          name="price"
          placeholder="8.50, 15..."
          value={price}
          onClick={() =>
            setError((prev) => prev.filter((el) => el !== "price"))
          }
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label htmlFor="quantity">
        Quantità
        <input
          className={`${error.includes("quantity") ? "error" : ""}`}
          type="number"
          name="quantity"
          value={quantity}
          placeholder="2, 3, 7..."
          onClick={() =>
            setError((prev) => prev.filter((el) => el !== "quantity"))
          }
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <label htmlFor="image">
        <div className="image-div">
          <p>Immagine</p> <span>ⓘ</span>
        </div>
        <input
          className={`${error.includes("image") ? "error" : ""}`}
          type="text"
          name="image"
          value={image}
          onClick={() =>
            setError((prev) => prev.filter((el) => el !== "image"))
          }
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <label htmlFor="date">
        Data di preparazione
        <input
          className={`${error.includes("date") ? "error" : ""}`}
          type="date"
          name="date"
          value={date}
          onClick={() => setError((prev) => prev.filter((el) => el !== "date"))}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <IngredientsInput
        ingredientList={ingredientList}
        ingredient={ingredient}
        ingredientQuantity={ingredientQuantity}
        error={error}
        setIngredientList={setIngredientList}
        setIngredient={setIngredient}
        setIngredientQuantity={setIngredientQuantity}
        setError={setError}
      />
      <button className="submit-btn" type="submit">
        {editingId ? "MODIFICA" : "PUBBLICA"}
      </button>
      <button onClick={handleReset} className="reset-btn" type="button">
        RESETTA
      </button>
    </form>
  );
};

export default FormComponent;
