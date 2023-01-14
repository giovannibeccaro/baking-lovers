import type { NextApiRequest, NextApiResponse } from "next";
import dbAccess from "../../utils/dbAccess";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = JSON.parse(req.body);
  const filter = { id: data.id };

  try {
    const { collection, client } = await dbAccess();

    const hour = new Date().getHours() + ":00";
    const expirationDate = new Date(data.date + " " + hour);
    // add 3 days to passed date
    expirationDate.setDate(expirationDate.getDate() + 3);

    await collection.updateOne(filter, {
      $set: {
        prodName: data.prodName,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
        date: data.date,
        ingredientList: data.ingredientList,
        expireAt: expirationDate,
      },
    });
    await client.close();
    res.status(201).json({ message: "Il dolce è stato eliminato!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Nessun dolce eliminato :(" });
  }
}
