"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGitHubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        errorCallbackURL: "/auth/login?error=true",
        newUserCallbackURL: "/welcome",
        disableRedirect: false,
      });
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            window.location.href = "/dashboard";
          },
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error("Email signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login / Sign Up</h1>

      <form onSubmit={handleEmailSignUp}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up with Email"}
        </button>
      </form>

      <div>
        <button onClick={handleGitHubLogin}>Sign in with GitHub</button>
      </div>
    </div>
  );
}
