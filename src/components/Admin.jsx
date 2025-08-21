import React, { useEffect, useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import * as FaIcons from "react-icons/fa";
import AdminBookings from "./AdminBookings";
import AdminContacts from "./AdminContacts";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
function AdminRooms() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [rooms, setRooms] = useState([]); 
    const [errors, setErrors] = useState({ price: "", size: "" });
  const [fieldErrors, setFieldErrors] = useState({ price: "", size: "", maxPerson: "" }); 

  const [facilitiesList, setFacilitiesList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    price: "",
    maxPerson: "",
    size: "",
    image: null, // will hold File object
    facilities: [],
  });

  const [imagePreview, setImagePreview] = useState(null);

  console.log(BASE_URL,"BASE_URL")
  // Fetch rooms and extract facilities
  const fetchRooms = async () => {
    try {
  const res = await fetch(`${BASE_URL}/api/admin/rooms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("res from api ", res);
      const data = await res.json();
      setRooms(data);

      // Extract unique facilities
      const allFacilities = [];
      data.forEach((room) => {
        if (Array.isArray(room.facilities)) {
          room.facilities.forEach((f) => {
            if (!allFacilities.some((af) => af.name === f.name)) {
              allFacilities.push(f);
            }
          });
        }
      });
      setFacilitiesList(allFacilities);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Delete room
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await fetch(`${import.meta.env}/api/admin/rooms/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRooms((prev) => prev.filter((room) => room._id !== id));
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  // Add or update room
  const handleSaveRoom = async (e) => {
    console.log("handleSaveRoom called"); 
    e.preventDefault();
    try {
      if (newRoom.price < 0 || newRoom.price > 500) {
        alert("Price must be between 0$ and 500$");
        return;
      }
      let imageUrl = null;
      // If a new image is selected, upload it first
      if (newRoom.image && typeof newRoom.image !== "string") {
        const formData = new FormData();
        formData.append("image", newRoom.image);
        const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl;
      } else if (typeof newRoom.image === "string") {
        imageUrl = newRoom.image;
      }
      let roomData = { ...newRoom, image: imageUrl };
      if (isEditing && !newRoom.image) delete roomData.image;
      // Save room
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `${BASE_URL}/api/admin/rooms/${editingId}`
        : `${BASE_URL}/api/admin/rooms`;
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(roomData),
      });
      if (!res.ok) throw new Error("Failed to save room");
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      resetForm();
      setImagePreview(null);
      fetchRooms();
    } catch (err) {
      alert("Error saving room: " + err.message);
    }
  };

  // Select/Deselect facility
  const handleFacilityChange = (facility) => {
    setNewRoom((prev) => {
      const exists = prev.facilities.some((f) => f.name === facility.name);
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((f) => f.name !== facility.name)
          : [...prev.facilities, facility],
      };
    });
  };

  const handleEdit = (room) => {
    setIsEditing(true);
    setEditingId(room._id);
    setNewRoom({
      name: room.name,
      description: room.description,
      price: room.price,
      maxPerson: room.maxPerson,
      size: room.size,
      image: room.image,
      facilities: room.facilities || [],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setNewRoom({
      name: "",
      description: "",
      price: "",
      maxPerson: "",
      size: "",
      image: "",
      facilities: [],
    });
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-[150px]">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Admin Panel</h1>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("rooms")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "rooms"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <FaIcons.FaBed className="mr-2 inline" />
            Manage Rooms
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "bookings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <FaIcons.FaCalendarCheck className="mr-2 inline" />
            Manage Bookings
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "contacts"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <FaIcons.FaEnvelope className="mr-2 inline" />
            Contact Submissions
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "rooms" ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-700">
              Room Management
            </h2>
            <button
              onClick={() => {
                resetForm();
                setIsEditing(false);
                setShowForm(true);
              }}
              className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
            >
              <FaIcons.FaPlus className="mr-2 inline" />
              Add New Room
            </button>
          </div>

          {/* FORM MODAL */}
          {showForm && (
            <div className="z-60 fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                  {isEditing ? "Edit Room" : "Create New Room"}
                </h2>
                {/* --- Validation State --- */}
                {/*
                  Place these hooks at the top of your AdminRooms function:
                  const [fieldErrors, setFieldErrors] = useState({ price: "", size: "", maxPerson: "" });
                */}
                <form
                
                  onSubmit={handleSaveRoom}
                  className="space-y-3"
                  encType="multipart/form-data"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setNewRoom({ ...newRoom, image: e.target.files[0] });
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    className="w-full rounded border p-2"
                    required={!isEditing}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mb-2 h-28 w-40 rounded-lg border-4 border-blue-200 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  <h3 className="font-bold">Room Name</h3>
                  <input
                    type="text"
                    name="roomname"
                    placeholder="Room Name"
                    value={newRoom.name}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, name: e.target.value })
                    }
                    className="w-full rounded border p-2"
                    required
                  />
                  <h3 className="font-bold">Details</h3>
                  <textarea
                    placeholder="Details"
                    value={newRoom.description}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, description: e.target.value })
                    }
                    className="w-full rounded border p-2"
                    required
                  />
                  <h3 className="font-bold">Price per night</h3>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price per night (0$ to 500$)"
                    value={newRoom.price}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewRoom({ ...newRoom, price: value });
                      let error = "";
                      const num = Number(value);
                      if (value === "") error = "Price is required";
                      else if (isNaN(num)) error = "Price must be a number";
                      else if (num <= 0) error = "Price must be greater than 0";
                      else if (num >= 500) error = "Price must be less than 500";
                      setFieldErrors((prev) => ({ ...prev, price: error }));
                    }}
                    className="w-full rounded border p-2"
                    required
                  />
                  {fieldErrors.price && (
                    <p className="text-red-500">{fieldErrors.price}</p>
                  )}

                  <h3 className="font-bold">Number of guests</h3>
                  <input
                    type="number"
                    name="maxPerson"
                    placeholder="Number of guests"
                    value={newRoom.maxPerson}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewRoom({ ...newRoom, maxPerson: value });
                      let error = "";
                      const num = Number(value);
                      if (value === "") error = "Guests is required";
                      else if (isNaN(num)) error = "Guests must be a number";
                      else if (num <= 0) error = "Guests must be greater than 0";
                      else if (num > 10) error = "Guests must be 10 or fewer";
                      setFieldErrors((prev) => ({ ...prev, maxPerson: error }));
                    }}
                    className="w-full rounded border p-2"
                    required
                  />
                  {fieldErrors.maxPerson && (
                    <p className="text-red-500">{fieldErrors.maxPerson}</p>
                  )}

                  <h3 className="font-bold">Room Size</h3>
                  <input
                    type="number"
                    name="size"
                    placeholder="Room Size (0m² to 80m²)"
                    value={newRoom.size}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewRoom({ ...newRoom, size: value });
                      let error = "";
                      const num = Number(value);
                      if (value === "") error = "Room size is required";
                      else if (isNaN(num)) error = "Room size must be a number";
                      else if (num <= 0) error = "Room size must be greater than 0";
                      else if (num >= 80) error = "Room size must be less than 80";
                      setFieldErrors((prev) => ({ ...prev, size: error }));
                    }}
                    className="w-full rounded border p-2"
                    required
                  />
                  {fieldErrors.size && (
                    <p className="text-red-500">{fieldErrors.size}</p>
                  )}

                  <div>
                    <h3 className="mb-2 font-semibold">Select Facilities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {facilitiesList.map((facility, idx) => {
                        const Icon =
                          FaIcons[facility.icon] || FaIcons.FaQuestion;
                        return (
                          <label
                            key={idx}
                            className="flex cursor-pointer items-center space-x-2 rounded border p-2 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={newRoom.facilities.some(
                                (f) => f.name === facility.name
                              )}
                              onChange={() => handleFacilityChange(facility)}
                            />
                            <Icon />
                            <span>{facility.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setIsEditing(false);
                      }}
                      className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button

                      type="submit"
                      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      disabled={
                        !!fieldErrors.price ||
                        !!fieldErrors.size ||
                        !!fieldErrors.maxPerson ||
                        !newRoom.price ||
                        !newRoom.size ||
                        !newRoom.maxPerson
                      }
                    >
                      {isEditing ? "Update Room" : "Save Room"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ROOMS TABLE */}
          <div className="overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Details</th>
                  <th className="border p-2">Price per night</th>
                  <th className="border p-2">Max Person</th>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Facilities</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="border p-2">
                      {room.image && (
                        <img
                          src={
                            room.image.startsWith("/uploads/")
                              ? `${BASE_URL}${room.image}`
                              : `${BASE_URL}/uploads/${room.image}`
                          }
                          alt={room.name}
                          className="mx-auto h-24 w-36 rounded-lg border-4 border-blue-100 object-cover shadow-md transition-transform duration-300 hover:scale-105"
                          style={{ background: "#f3f4f6" }}
                        />
                      )}
                    </td>
                    <td className="border p-2">{room.name}</td>
                    <td className="border p-2">{room.description}</td>
                    <td className="border p-2">${room.price}</td>
                    <td className="border p-2">{room.maxPerson}</td>
                    <td className="border p-2">{room.size} m²</td>
                    <td className="border p-2">
                      {room.facilities?.map((f, i) => {
                        const Icon = FaIcons[f.icon] || FaIcons.FaQuestion;
                        return (
                          <div
                            key={i}
                            className="flex items-center space-x-1 text-sm"
                          >
                            <Icon /> <span>{f.name}</span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="space-x-2 border p-2">
                      <button
                        onClick={() => handleEdit(room)}
                        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "bookings" ? (
        <AdminBookings />
      ) : (
        <AdminContacts />
      )}
    </div>
  );
}

export default function AdminRoomsPrivate(props) {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminRooms {...props} />
    </ProtectedRoute>
  );
}
