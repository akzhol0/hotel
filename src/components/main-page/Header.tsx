import React, { useContext } from "react";
import { contextData } from "@/components/context/context";

const Header = () => {
  const { userInfo, setAuth } = useContext(contextData);

  return (
    <div className="flex items-center gap-2 font-semibold text-2xl border-b-2 border-red-600 mb-4">
      Hotel Rooms |{" "}
      <p className="text-red-600">
        {userInfo.role}: {userInfo.userName}
      </p>{" "}
      |{" "}
      <button
        onClick={() => {
          localStorage.removeItem("userId");
          setAuth(false);
        }}
        className="px-2 py-1 duration-200 rounded hover:bg-red-600 hover:text-white"
      >
        Выйти
      </button>
    </div>
  );
};

export default Header;
