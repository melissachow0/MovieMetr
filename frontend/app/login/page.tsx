"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import styles from "./Auth.module.css";

import { useRouter } from 'next/navigation'


export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      username: "",
      password: "",
    });

    try {
      // Mock login validation (skipping real validation for this prototype)
      // Regardless of input, redirect to the user page
      router.push('/userpage')
    } catch (error: any) {
      setError("Username and password don't match");
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <h1 className={styles.head}>LOGIN</h1>
          <hr className={styles.line}></hr>
          <div className={styles.formRow}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          {error && (
            <p style={{ color: "#eb7673", fontSize: "0.85rem" }}>{error}</p>
          )}
          <div className={styles.loginBottomButtons}>
            <button className={styles.createAccountButton} type="submit">
              Login
            </button>
          </div>
          <p
            style={{
              fontWeight: "150",
              textAlign: "center",
              margin: "8px",
            }}
          >
            No account?&nbsp;
            <Link className={styles.link} href="/signup">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}