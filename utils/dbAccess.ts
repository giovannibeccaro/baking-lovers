import { MongoClient } from "mongodb";

export default async function dbAccess() {
  let db_uri = "";
  if (process.env.NEXT_PUBLIC_DB_URI) {
    db_uri = process.env.NEXT_PUBLIC_DB_URI;
  }
  const client = await MongoClient.connect(db_uri);
  const db = client.db();
  return { collection: db.collection("dolci"), client };
}
