import React, { useEffect } from "react";
import dbAccess from "../../utils/dbAccess";
import { ProductType } from "../../types";
import SingleDolce from "../../components/SingleDolce/SingleDolce";

type Props = {
  dolci: ProductType[];
};

const Dolci: React.FC<Props> = ({ dolci }) => {
  useEffect(() => {
    document.body.classList.add("bg2");

    return () => {
      document.body.classList.remove("bg2");
    };
  }, []);

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
  // we map through dolci to not pass property "_id" passed by mongoDB
  const mappedDolci = dolci.map((el) => ({
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
      dolci: mappedDolci.length ? mappedDolci : [],
    },
    revalidate: 1,
  };
}

export default Dolci;
