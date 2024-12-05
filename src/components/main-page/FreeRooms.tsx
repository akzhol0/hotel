import React, { useContext, useEffect, useState } from "react";
import { query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Room from "@/components/main-page/Room";
import { contextData } from "@/components/context/context";
import { collection, addDoc } from "firebase/firestore";
import { doc } from "@firebase/firestore";

const FreeRooms = () => {
  const { userInfo } = useContext(contextData);
  const [freeRooms, setFreeRooms] = useState<any>([]);
  const [fetched, setFetched] = useState(false);

  const [roomListNumber, setRoomListNumber] = useState<number>();

  useEffect(() => {
    !fetched && getFreeRooms();
  }, []);

  const getFreeRooms = async () => {
    const q = query(collection(db, "freeRooms"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFreeRooms((prev: any) => [...prev, doc.data()]);
    });
    setFetched(true);
  };

  const addRoomsList = async () => {
    const docRef = await addDoc(collection(db, "freeRooms"), {
      roomId: Math.round(Math.random() * 1000),
      roomNumber: roomListNumber,
    });
    setFreeRooms((prev: any) => [
      ...prev,
      {
        roomId: Math.round(Math.random() * 1000),
        roomNumber: roomListNumber,
      },
    ]);
  };

  return (
    <div>
      <div className="w-[400px] min-h-[600px] flex flex-col items-center border">
        <p className="font-semibold border-b border-red-600 text-lg">
          Свободные комнаты
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          {freeRooms.map((room: any) => (
            <Room room={room} key={room.roomId} />
          ))}
        </div>
      </div>
      {userInfo.role === "Администратор" && (
        <div className="flex justify-between py-4 px-2">
          <input
            className="ps-2 py-2 border-b rounded-lg focus:outline-none"
            placeholder="Номер комнаты"
            type="number"
            onChange={(e) => setRoomListNumber(Number(e.target.value))}
          />
          <div
            onClick={() => addRoomsList()}
            className="py-1 px-4 font-semibold cursor-pointer rounded-lg
        text-red-600 border-2 border-red-600 hover:bg-red-500 duration-300 hover:text-white"
          >
            Добавить
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeRooms;
