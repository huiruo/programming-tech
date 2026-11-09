"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./layout.module.css";

const AUTH_STORAGE_KEY = "interview-access-granted";
const USERNAME = "admin";
const PASSWORD = "abchen";

export default function InterviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsAuthorized(sessionStorage.getItem(AUTH_STORAGE_KEY) === "true");
    setIsReady(true);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === USERNAME && password === PASSWORD) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthorized(true);
      setError("");
      return;
    }

    setError("账号或密码错误，请重试。");
  };

  if (isReady && isAuthorized) return <>{children}</>;

  return (
    <section className={styles.gate} aria-busy={!isReady}>
      <div className={styles.card}>
        <h1 className={styles.title}>Interview 私有内容</h1>
        <p className={styles.description}>请输入账号和密码后继续访问。</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            账号
            <input name="username" autoComplete="username" required />
          </label>
          <label className={styles.field}>
            密码
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.submit} type="submit">访问内容</button>
        </form>
      </div>
    </section>
  );
}
