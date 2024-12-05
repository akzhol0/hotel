"use client";

import React, { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/components/firebase/config";

type ContextProps = {
  auth: boolean;
  setAuth: (arg0: boolean) => void;
  userInfo: any;
  setUserInfo: (arg0: any) => void;
  checkIfUserLogged: () => void;
  currentRoom: any;
  setCurrentRoom: (arg0: any) => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [currentRoom, setCurrentRoom] = useState<any>(userInfo.room || []);

  useEffect(() => {
    !auth && checkIfUserLogged();
  }, []);

  const checkIfUserLogged = async () => {
    const result = localStorage.getItem("userId");
    const userId = result ? JSON.parse(result) : null;

    if (userId !== null) {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAuth(true);
        setUserInfo(docSnap.data());
      }
    }
  };

  return (
    <contextData.Provider
      value={{
        auth,
        setAuth,
        userInfo,
        setUserInfo,
        checkIfUserLogged,
        currentRoom,
        setCurrentRoom,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
