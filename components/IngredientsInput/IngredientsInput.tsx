import React, { useEffect, useState } from "react";

type Props = {
  ingredientList: string[];
  ingredient: string;
  ingredientQuantity: string;
  error: string[];
  setIngredient: React.Dispatch<React.SetStateAction<string>>;
  setIngredientQuantity: React.Dispatch<React.SetStateAction<string>>;
  setIngredientList: React.Dispatch<React.SetStateAction<string[]>>;
  setError: React.Dispatch<React.SetStateAction<string[]>>;
};

const IngredientsInput: React.FC<Props> = ({
  ingredient,
  ingredientQuantity,
  ingredientList,
  error,
  setIngredient,
  setIngredientQuantity,
  setIngredientList,
  setError,
}) => {
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(
    ingredientList.length
  );

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
      //? here we check if our current index of ingredientList is smaller than the list length itself. If it is indeed smaller, it means that we are modifing an element of the list, and therefore we need to update it at its index
      if (currentIngredientIndex < ingredientList.length) {
        // we create a copy of the originala array
        const ingredientsCopy = [...ingredientList];
        // we get the ingredient at n index
        let ingredientToChange = ingredientsCopy[currentIngredientIndex];
        // we change the ingredient value
        ingredientToChange = `${ingredient}: ${ingredientQuantity}`;
        // we push the new value at the n index
        ingredientsCopy[currentIngredientIndex] = ingredientToChange;
        // we set the state
        setIngredientList(ingredientsCopy);
        setIngredient("");
        setIngredientQuantity("");
      } else {
        setIngredientList((prev) => [
          ...prev,
          `${ingredient}: ${ingredientQuantity}`,
        ]);
        setIngredient("");
        setIngredientQuantity("");
        setCurrentIngredientIndex((prev) => (prev += 1));
      }
    }
  }

  function handleChange(direction: number) {
    // manage cases where user goes after last element or before first element. In both cases, the result will be
    if (currentIngredientIndex + direction >= ingredientList.length) {
      setIngredient("");
      setIngredientQuantity("");
      setCurrentIngredientIndex(ingredientList.length);
      return;
    }
    const currentIngredient =
      ingredientList[currentIngredientIndex + direction]; // this checks what the user wants (if previous or next ingredient)
    const currIngredientSplit = currentIngredient.split(":"); // we split current ingredient in |ingredient| and |quantity|
    const currIngredient = currIngredientSplit[0];
    const currQuantity = currIngredientSplit[1];
    setIngredient(currIngredient);
    setIngredientQuantity(currQuantity);
    setCurrentIngredientIndex(currentIngredientIndex + direction);
  }

  useEffect(() => {
    setCurrentIngredientIndex(ingredientList.length);
  }, [ingredientList]);

  return (
    <div className="ingredients-and-quantity">
      <button
        disabled={currentIngredientIndex === 0}
        onClick={() => handleChange(-1)}
        className="prev-ingredient"
        type="button"
      >
        ←
      </button>

      <label htmlFor="ingredient">
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
      <label htmlFor="ingredient-quantity">
        Quantità
        <input
          className={`${error.includes("ingredientQuantity") ? "error" : ""}`}
          type="text"
          name="ingredient-quantity"
          placeholder="500gr..."
          value={ingredientQuantity}
          onClick={() =>
            setError((prev) => prev.filter((el) => el !== "ingredientQuantity"))
          }
          onChange={(e) => setIngredientQuantity(e.target.value)}
        />
      </label>
      <button
        disabled={currentIngredientIndex === ingredientList.length}
        onClick={() => handleChange(1)}
        className="next-ingredient"
        type="button"
      >
        →
      </button>
      <button
        type="button"
        onClick={handleIngredientSubmit}
        className="add-ingredient"
      >
        ADD
      </button>
    </div>
  );
};

export default IngredientsInput;
