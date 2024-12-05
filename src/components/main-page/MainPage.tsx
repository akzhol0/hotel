"use client";

import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import Header from "@/components/main-page/Header";
import UserRoom from "@/components/main-page/UserRoom";
import FreeRooms from "@/components/main-page/FreeRooms";
import BusyRooms from "@/components/BusyRooms";

const MainPage = () => {
  const { userInfo } = useContext(contextData);

  return (
    <div className="w-full h-screen flex justify-center">
      <section className="w-[95%] xl:w-[60%] h-full flex flex-col items-center border-x border-gray-400">
        <Header />
        <div className="w-full flex justify-between">
          <FreeRooms />
          {userInfo.role === "Администратор" ? (
            <div className="w-[400px] min-h-[600px] flex flex-col items-center border">
              <p className="font-semibold border-b border-red-600 text-lg">
                Занятые комнаты
              </p>
              <BusyRooms />
            </div>
          ) : (
            <UserRoom />
          )}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
