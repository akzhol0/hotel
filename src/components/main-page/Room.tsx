import React, { useContext } from "react";
import { contextData } from "@/components/context/context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";

type RoomProps = {
  room: any;
};

const Room = ({ room }: RoomProps) => {
  const { setCurrentRoom, userInfo } = useContext(contextData);
  room.role && console.log(room);

  const addRoom = async () => {
    setCurrentRoom({
      roomId: room.roomId,
      roomNumber: room.roomNumber,
    });

    const washingtonRef = doc(db, "users", `${userInfo.userId}`);
    await updateDoc(washingtonRef, {
      room: {
        roomId: room.roomId,
        roomNumber: room.roomNumber,
      },
    });
  };

  return (
    <div className="w-full flex gap-2 items-center justify-center bg-gray-100 py-4 my-1 font-semibold text-lg">
      <p>Комната номер: {room.roomNumber}</p>
      {userInfo.role !== "Администратор" && (
        <>
          |
          <div
            onClick={() => addRoom()}
            className="cursor-pointer border-b hover:border-b hover:border-red-600"
          >
            Выбрать
          </div>
        </>
      )}
    </div>
  );
};

export default Room;
