import { useParams } from "react-router-dom";

import { FaCheck } from "react-icons/fa";

import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import components
import CheckIn from "../components/CheckIn";
import CheckOut from "../components/CheckOut";
import AdultsDropdown from "../components/AdultsDropdown";
import KidsDropdown from "../components/KidsDropdown";
import ScrollToTop from "../components/ScrollToTop";
import { loadStripe } from "@stripe/stripe-js";


const BASE_URL = import.meta.env.VITE_BASE_URL;



const RoomDetails = () => {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guestName, setGuestName] = useState("");
  const { id } = useParams();
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("id", id);

    const fetchRoom = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/rooms/${id}`);
        console.log("Fetched room from MongoDB:", res.data); // ✅ ADD THIS
        setRoom(res.data);
        console.log(res);
        // setAllRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, []);

  if (loading || !room) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Room Details...</h2>
      </div>
    );
  }

  // destructure room
  const { name, description, facilities, price, image, roomNumber } = room;

  const handleBooking = async () => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      alert("Please login to book a room");
      navigate("/pages/Login");
      return;
    }

    // Check if required fields are filled
    if (!checkIn || !checkOut || !guestName) {
      alert("Please fill in all required fields");
      return;
    }

    const stripe = await loadStripe(
      "pk_test_51RSfz4PRzh7X3yfqJ9atr9Zb4Q7HpeOKsECJPxGHKps7juiICODnWLOftMFFvGgu3mc3TjgbR4pfsBTSHR6Iau6w00lHrilSyh"
    );

    try {
      const payload = {
        roomName: name,
        roomNumber: id,
        guestName: guestName,
        checkIn: checkIn ? checkIn.toISOString() : null,
        checkOut: checkOut ? checkOut.toISOString() : null,
        price: price,
        userId: user.id, // Add user ID to the booking
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/bookings/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      // Navigate to Stripe checkout using the URL from the response
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL received from API");
        alert("Failed to get checkout URL");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed");
    }
  };
  console.log("image", image);
  return (
    <section>
      <ScrollToTop />

      {/* room banner */}
      <div className="relative flex h-[560px] items-center justify-center bg-room bg-cover bg-center">
        {/* room overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-black/50" />

        {/* room title */}
        <h1 className="z-20 text-center font-primary text-6xl text-white">
          {name} Details
        </h1>
      </div>

      {/* room data */}
      <div className="container mx-auto">
        <div className="flex h-full flex-col py-24 lg:flex-row">
          {/* data left */}
          <div className="h-full w-full px-6 lg:w-[60%]">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
            <img
              src={`${BASE_URL}${room.image}`}
              alt="room details image"
            />

            {/* room facilities */}
            <div className="mt-12">
              <h3 className="h3 mb-3">Room Facilities</h3>
              <p className="mb-12">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
                adipisci aspernatur, nisi dolores iste perferendis similique
                praesentium ullam tempore porro incidunt, facere commodi. Porro
                voluptatem voluptatibus sit, culpa saepe nostrum.
              </p>

              <div className="mb-12 grid grid-cols-3 gap-6">
                {facilities.map((item, index) => {
                  // destructure item
                  const { icon, name } = item;

                  return (
                    <div
                      key={index}
                      className="flex flex-1 items-center gap-x-3"
                    >
                      {/* <div className="text-2xl text-accent">{icon}</div> */}

                      <div className="text-base">{name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* data right */}
          <div className="h-full w-full lg:w-[40%]">
            {/* data reservation */}
            <div className="mb-12 bg-accent/20 py-8 px-6">
              <div className="mb-4 flex flex-col space-y-4">
                <h3>Your Reservation</h3>

                <div className="h-[60px]">
                  <CheckIn selected={checkIn} onChange={setCheckIn} />
                </div>
                <div className="h-[60px]">
                  <CheckOut selected={checkOut} onChange={setCheckOut} />
                </div>
                <input
                  type="text"
                  placeholder="Guest name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="mb-4 mt-2 w-full rounded border p-3"
                />
                <div className="h-[60px]">
                  <AdultsDropdown />
                </div>
                <div className="h-[60px]">
                  <KidsDropdown />
                </div>
              </div>

              <button
                className="btn btn-lg btn-primary w-full"
                onClick={handleBooking}
              >
                {isAuthenticated()
                  ? `Book now from $${price}`
                  : "Login to Book"}
              </button>
            </div>

            {/* data hotel rules */}
            <div>
              <h3 className="h3">Hotel Rules</h3>
              <p className="mb-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente, aliquid modi. Sed laudantium unde distinctio quas,
                repudiandae fuga veniam tempora, quae nobis quo dicta a.
              </p>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  Check-in: 3:00 PM - 9:00 PM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  Check-out: 10:30 AM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  No Pets
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  No Smoking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
