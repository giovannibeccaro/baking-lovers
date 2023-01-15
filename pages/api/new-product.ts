import type { NextApiRequest, NextApiResponse } from "next";
import dbAccess from "../../utils/dbAccess";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = req.body;
  try {
    const { collection, client } = await dbAccess();
    const hour = new Date().getHours() + ":00";
    const expirationDate = new Date(data.date + " " + hour);
    // add 3 days to passed date
    expirationDate.setDate(expirationDate.getDate() + 3);
    await collection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    await collection.insertOne({ ...data, expireAt: expirationDate });
    client.close();
    res.status(201).json({ message: "Il dolce è stato aggiunto!" });
  } catch (error) {
    res.status(500).json({ message: "Nessun dolce aggiunto :(" });
  }
}
