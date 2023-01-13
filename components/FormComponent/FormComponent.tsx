import React from "react";

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
}) => {
  function handleIngredientSubmit() {
    setError([]); // error reset
    // first check if both ingredient and quantity are valid
    if (!ingredient || ingredient.indexOf(":") !== -1) {
      setError((prev) => [...prev, "ingredient"]);
    }
    if (!ingredientQuantity || ingredientQuantity.indexOf(":") !== -1) {
      setError((prev) => [...prev, "ingredientQuantity"]);
    }

    // if both are valid, insert ingredient in ingredientList
    if (
      ingredient &&
      ingredientQuantity &&
      ingredient.indexOf(":") === -1 &&
      ingredientQuantity.indexOf(":") === -1
    ) {
      setIngredientList((prev) => [
        ...prev,
        `${ingredient}: ${ingredientQuantity}`,
      ]);
      setIngredient("");
      setIngredientQuantity("");
    }
  }

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
    postRequest();
    setProdName("");
    setPrice("");
    setQuantity("");
    setImage("");
    setDate("");
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
    };
    const req = await fetch("/api/new-product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (req.ok) {
      setPopupMessage("Il prodotto è stato inserito correttamente!");
    } else {
      setPopupMessage("C'è stato un problema con il caricamento, riprovare");
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
      <div className="ingredients-and-quantity">
        <label htmlFor="ingredients">
          Ingrediente
          <input
            className={`${error.includes("ingredient") ? "error" : ""}`}
            type="text"
            name="ingredient"
            placeholder="Farina..."
            value={ingredient}
            onClick={() =>
              setError((prev) => prev.filter((el) => el !== "ingredient"))
            }
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <label htmlFor="ingredientQuantity">
          Quantità
          <input
            className={`${error.includes("ingredientQuantity") ? "error" : ""}`}
            type="text"
            name="ingredient-quantity"
            placeholder="500gr..."
            value={ingredientQuantity}
            onClick={() =>
              setError((prev) =>
                prev.filter((el) => el !== "ingredientQuantity")
              )
            }
            onChange={(e) => setIngredientQuantity(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={handleIngredientSubmit}
          className="add-ingredient"
        >
          INSERISCI
        </button>
      </div>
      <button className="submit-btn" type="submit">
        PUBBLICA
      </button>
      <button className="reset-btn" type="button">
        RESETTA
      </button>
    </form>
  );
};

export default FormComponent;
