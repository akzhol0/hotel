import React, { useEffect, useState } from "react";
import Room from "@/components/main-page/Room";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import BusyRoomOne from "@/components/main-page/BusyRoomOne";
import { set } from "@firebase/database";

const BusyRooms = () => {
  const [busyRooms, setBusyRooms] = useState<any>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    !fetched && getAllBusyRooms();
  }, []);

  const deleteBusyRoom = async (item: any) => {
    const washingtonRef = doc(db, "users", `${item.userId}`);
    await updateDoc(washingtonRef, {
      room: {},
    });

    setFetched(false);
  };

  const getAllBusyRooms = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusyRooms((prev: any) => [...prev, doc.data()]);
    });
    setFetched(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {busyRooms.map((item: any) => (
        <BusyRoomOne
          deleteBusyRoom={deleteBusyRoom}
          item={item}
          key={item.userId}
        />
      ))}
    </div>
  );
};

export default BusyRooms;
