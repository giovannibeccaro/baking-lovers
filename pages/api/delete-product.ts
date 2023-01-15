import type { NextApiRequest, NextApiResponse } from "next";
import dbAccess from "../../utils/dbAccess";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = req.body; // this contains name, price, quantity etc.
  const query = { id };
  try {
    const { collection, client } = await dbAccess();
    await collection.deleteOne(query);
    client.close();
    res.status(201).json({ message: "Il dolce è stato eliminato!" });
  } catch (error) {
    res.status(500).json({ message: "Nessun dolce eliminato :(" });
  }
}
