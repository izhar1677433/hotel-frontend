import React, { useEffect, useState } from "react";

function SimpleRoomForm() {
  const [form, setForm] = useState({ price: "", size: "" });
  const [errors, setErrors] = useState({ price: "", size: "" });

  const validate = (name, value) => {
    let error = "";
    const num = Number(value);

    if (value === "") {
      error = `${name} is required`;
    } else if (isNaN(num)) {
      error = `${name} must be a number`;
    } else {
      if (name === "price") {
        if (num <= 0) error = "Price must be greater than 0";
        else if (num >= 500) error = "Price must be less than 500";
      }
      if (name === "size") {
        if (num <= 0) error = "Room size must be greater than 0";
        else if (num >= 80) error = "Room size must be less than 80";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    console.log("handleChange called");
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };
  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: Price = ${form.price}, Size = ${form.size}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-60 rounded border p-2"
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
      </div>
      <div>
        <label>Room Size:</label>
        <input
          type="text"
          name="size"
          value={form.size}
          onChange={handleChange}
          className="w-60 rounded border p-2"
        />
        {errors.size && <p className="text-red-500">{errors.size}</p>}
      </div>
      <button
        type="submit"
        disabled={!!errors.price || !!errors.size || !form.price || !form.size}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
}

export default SimpleRoomForm;
