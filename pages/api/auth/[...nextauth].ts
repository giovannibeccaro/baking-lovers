import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";
import { dbAccessUsers } from "../../../utils/dbAccess";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  //Configure JWT
  session: {
    strategy: "jwt",
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { collection, client } = await dbAccessUsers();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // find user in db with email
        const result = await collection.findOne({
          email: email,
        });
        // if not found, throw error
        if (!result) {
          await client.close();
          throw new Error("No user found with the email");
        }

        // check if this password is equal to the one in the db (everything is hashed)

        const checkPassword = await compare(password, result.password);
        // if incorrect password, throw error
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        // if no errors are thrown, send successful res
        client.close();
        return { id: result._id.toString(), email: result.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
