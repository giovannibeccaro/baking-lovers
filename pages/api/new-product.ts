import type { NextApiRequest, NextApiResponse } from "next";
import dbAccess from "../../utils/dbAccess";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = req.body; // this contains name, price, quantity etc.
  try {
    const { collection, client } = await dbAccess();
    collection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Il dolce è stato aggiunto!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Nessun dolce aggiunto :(" });
  }
}
