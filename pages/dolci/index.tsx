import React from "react";
import dbAccess from "../../utils/dbAccess";
import { ProductType } from "../../types";
import SingleDolce from "../../components/SingleDolce/SingleDolce";

type Props = {
  dolci: ProductType[];
};

const Dolci: React.FC<Props> = ({ dolci }) => {
  console.log(dolci);
  return (
    <main className="main-dolci">
      <h1>I nostri Dolci</h1>
      <section className="section-dolci">
        {dolci.map((el) => (
          <SingleDolce key={el.id} {...el} />
        ))}
      </section>
    </main>
  );
};

export async function getStaticProps() {
  const { collection, client } = await dbAccess();
  const dolci = await collection.find().toArray();
  const dolciSerialized = dolci.map((el) => ({
    prodName: el.prodName,
    price: el.price,
    quantity: el.quantity,
    image: el.image,
    ingredientList: el.ingredientList,
    id: el.id,
  }));
  client.close();

  return {
    props: {
      dolci: dolciSerialized.length ? dolciSerialized : [],
    },
    revalidate: 1,
  };
}

export default Dolci;
