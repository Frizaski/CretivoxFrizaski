"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole, LogOut } from "lucide-react";
import { clearAuthSession, getStoredUser, storeAuthSession } from "./authSession";
import styles from "./LoginGate.module.css";

interface LoginGateProps {
  unlocked: boolean;
}

interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  message?: string;
}

export default function LoginGate({ unlocked }: LoginGateProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.accessToken) {
        throw new Error(data.message || "Username atau password tidak valid.");
      }

      storeAuthSession(
        data.accessToken,
        data.refreshToken,
        {
          firstName: data.firstName || "Intern",
          lastName: data.lastName || "",
          username: data.username || username,
        }
      );
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Login gagal. Silakan coba kembali.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const storedUser = unlocked ? getStoredUser() : null;

  return (
    <section id="access" className={styles.loginSection}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Mau Lanjut Ya?</p>
          <h2 className={styles.heading}>
            Login
            <br />
            <span>Dulu</span>
            <br />
            <span>Yuk!</span>
          </h2>
          <p className={styles.description}>
            Websitenya belum beres, tapi kamu harus login dulu buat lanjut.
            Masukin username dan password-nya buat lanjut scroll sampai bawah.
          </p>
        </div>

        <div className={styles.card}>
          {unlocked ? (
            <div className={styles.success}>
              <div className={styles.iconBadge}>
                <LockKeyhole size={20} />
              </div>
              <p className={styles.cardLabel}>Akses Diterima</p>
              <h3 className={styles.welcome}>
                Selamat datang, {storedUser?.firstName || "Intern"}.
              </h3>
              <p className={styles.message}>
                Autentikasi berhasil. Seluruh portfolio sekarang sudah terbuka.
              </p>
              <button type="button" className={styles.submitButton} onClick={handleContinue}>
                Lihat Project <ArrowRight size={17} />
              </button>
              <button type="button" className={styles.logoutButton} onClick={clearAuthSession}>
                <LogOut size={15} /> Keluar
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.iconBadge}>
                <LockKeyhole size={20} />
              </div>
              <p className={styles.cardLabel}>Ini Loginnya</p>
              <h3 className={styles.cardTitle}>Enter Buat Lanjut</h3>

              <label className={styles.field}>
                <span>Username</span>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label className={styles.field}>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>

              {error ? <p className={styles.error}>{error}</p> : null}

              <button className={styles.submitButton} type="submit" disabled={submitting}>
                {submitting ? "Authenticating..." : "Lanjut Scrolling"}
                {!submitting && <ArrowRight size={17} />}
              </button>

              <p className={styles.hint}>
                Demo access: <strong>emilys</strong> / <strong>emilyspass</strong>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
