export const inputErrors: InputErrorsType = {
  prodName: "Inserisci il nome del prodotto",
  price:
    "Il prezzo non è stato inserito in maniera corretta, gli unici caratteri consentiti sono i numeri e il punto",
  quantity: "La quantità non è stata inserita in maniera corretta",
  image: "Non hai inserito un'immagine",
  date: "La data non è stata inserita correttamente",
  ingredientList: "Non hai inserito alcun ingrediente",
  ingredient: "Inserisci un ingrediente",
  ingredientQuantity: "Inserisci una quantità",
};

type InputErrorsType = {
  prodName: string;
  price: string;
  quantity: string;
  image: string;
  date: string;
  ingredientList: string;
  ingredient: string;
  ingredientQuantity: string;
};
