import React from "react";

const Card = ({ 
  children, 
  className = "", 
  padding = "p-6",
  background = "bg-white",
  border = "border border-gray-200",
  shadow = "shadow-md",
  hover = "hover:shadow-lg",
  rounded = "rounded-xl",
  transition = "transition-all duration-200"
}) => {
  return (
    <div className={`${background} ${border} ${shadow} ${hover} ${rounded} ${padding} ${transition} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
