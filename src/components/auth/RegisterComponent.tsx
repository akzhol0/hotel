"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "@firebase/firestore";
import { db, auth } from "@/components/firebase/config";

const RegisterComponent = () => {
  const [userName, setUserName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, login, password)
      .then((userCredentials) => {
        router.push("/");
        addUserFirebase(userCredentials);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const addUserFirebase = async (userInfo: any) => {
    await setDoc(doc(db, "users", userInfo.user.uid), {
      userName: userName,
      userId: userInfo.user.uid,
      userLogin: login,
      userPassword: password,
      role: "Пользователь",
      room: {},
    });
  };

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center rounded-xl text-black"
      >
        <p className="text-3xl py-4">Регистрация</p>
        <div className="flex flex-col gap-4">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder="Имя"
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder="Почта"
            type="text"
            id="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <div className="relative">
            <input
              className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
              placeholder="Пароль"
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link href="/">
            <p className="text-sm text-center cursor-pointer">
              Есть аккаунт? Войти!
            </p>
          </Link>
          <button
            type="submit"
            className="py-2 rounded-lg bg-[#131313] border-white hover:bg-red-500 duration-300 text-white"
          >
            Регистрация
          </button>
          <p className="text-sm text-center cursor-pointer text-red-600">
            {error}
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
