"use client";

import { useContext } from "react";
import { contextData } from "@/components/context/context";
import LoginComponent from "@/components/auth/LoginComponent";
import MainPage from "@/components/main-page/MainPage";

export default function Home() {
  const { auth } = useContext(contextData);

  return auth ? <MainPage /> : <LoginComponent />;
}
