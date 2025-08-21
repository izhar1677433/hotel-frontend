import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import axios from "axios";
import Room from "../components/Room";
import { SpinnerDotted } from "spinners-react";


const BASE_URL = import.meta.env.VITE_BASE_URL;


const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  const fetchRooms = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${BASE_URL}/api/rooms/getAllRooms`);
          setRooms(res.data);
  } catch (err) {
    console.error("Failed to fetch rooms:", err);
  } finally {
    setLoading(false);
  }
};
  fetchRooms()
  }, [])
  return (
    <section className="rooms pt-[130px]">
      {/* overlay & spinner loader */}
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/90">
          <SpinnerDotted color="white" />
        </div>
      )}

      <div className="container mx-auto py-24">
        <div className="text-center">
          <div className="font-tertiary text-[15px] uppercase tracking-[6px]">
            Royal Heights & Resturant
          </div>
          <h2 className="mb-4 font-primary text-[32px] lg:text-[45px]">
            Hotel & Suites
          </h2>
        </div>

        {/* grid */}
        <div className="mx-auto grid max-w-sm grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {rooms.map((room) => {
            return <Room room={room} key={room._id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
