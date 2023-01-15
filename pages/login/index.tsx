import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.status === 200) {
      router.replace("/");
    } else
      alert("La mail o la password non hanno dato risultati, prova di nuovo.");
  }

  if (status === "authenticated") return <div>Already logged in</div>;

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">
        {" "}
        Email
        <input
          type="text"
          name="email"
          placeholder="luana@bakermail.it"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        {" "}
        Password
        <input
          type="password"
          name="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button disabled={loading} type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
