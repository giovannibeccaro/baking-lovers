import type { NextApiRequest, NextApiResponse } from "next";
import dbAccess from "../../utils/dbAccess";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = JSON.parse(req.body); // this contains name, price, quantity etc.
  const filter = { id: data.id };
  console.log(filter);
  try {
    const { collection, client } = await dbAccess();
    await collection.updateOne(filter, {
      $set: {
        prodName: data.prodName,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
        date: data.date,
        ingredientList: data.ingredientList,
      },
    });
    await client.close();
    res.status(201).json({ message: "Il dolce è stato eliminato!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Nessun dolce eliminato :(" });
  }
}