import React, { useEffect, useState } from "react";
import FormComponent from "../../components/FormComponent/FormComponent";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import ProductList from "../../components/ProductList/ProductList";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import { ProductType } from "../../types";
import dbAccess from "../../utils/dbAccess";
import { inputErrors } from "../../utils/inputErrors";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  dolci: ProductType[];
};

const Admin: React.FC<Props> = ({ dolci }) => {
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
  const [editingId, setEditingId] = useState("");
  const [allProducts, setAllProducts] = useState<ProductType[]>(dolci);

  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    // if user is not authenticated, redirect to login
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // if user is not authenticated return loading
  if (status !== "authenticated") return <div>Loading</div>;

  return (
    <main className="main-admin">
      <h1>Pannello di controllo amministratore</h1>
      {popupMessage && (
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
          setAllProducts={setAllProducts}
          editingId={editingId}
          setEditingId={setEditingId}
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
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        setPopupMessage={setPopupMessage}
        setProdName={setProdName}
        setPrice={setPrice}
        setQuantity={setQuantity}
        setImage={setImage}
        setDate={setDate}
        setIngredientList={setIngredientList}
        setEditingId={setEditingId}
      />
    </main>
  );
};

export async function getServerSideProps() {
  const { collection, client } = await dbAccess();
  const dolci = await collection.find().toArray();
  const dolciSerialized = dolci.map((el) => ({
    prodName: el.prodName,
    price: el.price,
    quantity: el.quantity,
    date: el.date,
    image: el.image,
    ingredientList: el.ingredientList,
    id: el.id,
    expirationDate: JSON.stringify(el.expireAt),
  }));
  client.close();

  return {
    props: {
      dolci: dolciSerialized.length ? dolciSerialized : [],
    },
  };
}

export default Admin;
