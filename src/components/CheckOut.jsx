import React, { useState } from "react";

// import icon
import { BsCalendar } from "react-icons/bs";

// import datepicker
import DataPicker from "react-datepicker";

// import datepicker css
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/_datepicker.css";

const CheckOut = ({ selected, onChange }) => {
  const [internalEndDate, setInternalEndDate] = useState(null);
  const value = selected ?? internalEndDate;
  const handleChange = (date) => {
    if (onChange) onChange(date);
    setInternalEndDate(date);
  };

  return (
    <div className="relative flex h-full items-center justify-end">
      {/* date icons */}
      <div className="absolute z-30 pr-8">
        <div>
          <BsCalendar className="text-base text-accent" />
        </div>
      </div>

      {/* date calendar */}
      <DataPicker
        className="h-full w-full"
        selected={value}
        placeholderText="Check out"
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckOut;
