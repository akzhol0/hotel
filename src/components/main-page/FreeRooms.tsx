import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const FreeRooms = () => {
  const [freeRooms, setFreeRooms] = useState<any>([]);
  const [fetched, setFetched] = useState(false);

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

  return (
    <div className="w-[400px] min-h-[600px] flex flex-col items-center border">
      <p className="font-semibold border-b border-red-600 text-lg">
        Свободные комнаты
      </p>
      <div className="w-full flex flex-col items-center justify-center">
        {freeRooms.map((room: any) => (
          <div
            key={room.roomId}
            className="w-full flex gap-2 items-center justify-center bg-gray-100 py-4 my-1 font-semibold text-lg"
          >
            <p>Комната номер: {room.roomNumber}</p> |
            <div className="cursor-pointer border-b hover:border-b hover:border-red-600">
              Выбрать
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeRooms;
