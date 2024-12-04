import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";

const UserRoom = () => {
  const { userInfo, checkIfUserLogged } = useContext(contextData);

  const deleteRoom = async () => {
    delete userInfo.room;

    const washingtonRef = doc(db, "users", `${userInfo.userId}`);
    await updateDoc(washingtonRef, {
      room: {},
    });
  };

  return (
    <div className="w-[400px] min-h-[600px] flex flex-col items-center border">
      <p className="font-semibold border-b border-red-600 text-lg">
        Ваша комната
      </p>
      <div className="w-full font-semibold text-lg">
        {userInfo.room.roomNumber ? (
          <div className="flex justify-center gap-4 py-4 bg-gray-100 my-2">
            <p>Ваша комната номер - {userInfo.room.roomNumber}</p> |
            <div
              onClick={() => deleteRoom()}
              className="cursor-pointer border-b hover:border-b hover:border-red-600"
            >
              Удалить
            </div>
          </div>
        ) : (
          <p className="py-4 bg-gray-100 text-center my-2">
            У вас нету комнаты
          </p>
        )}
      </div>
    </div>
  );
};

export default UserRoom;
