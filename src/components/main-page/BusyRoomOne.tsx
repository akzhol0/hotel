import React, { useContext } from "react";

type BusyRoomOneProps = {
  item: any;
  deleteBusyRoom: (arg0: any) => void;
};

const BusyRoomOne = ({ item, deleteBusyRoom }: BusyRoomOneProps) => {
  return (
    item.room?.roomNumber && (
      <div className="w-full flex flex-col items-center justify-center bg-gray-100 py-4 my-1 font-semibold text-lg">
        <div className="flex gap-2">
          <p>Комната номер: {item.room.roomNumber}</p>|
          <p>Имя: {item.userName}</p>
        </div>
        <div
          onClick={() => deleteBusyRoom(item)}
          className="cursor-pointer border-b hover:border-b hover:border-red-600"
        >
          Выселить
        </div>
      </div>
    )
  );
};

export default BusyRoomOne;
