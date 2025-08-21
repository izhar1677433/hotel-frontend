import React from "react";

const Container = ({ 
  children, 
  className = "", 
  maxWidth = "max-w-7xl",
  padding = "px-4 lg:px-8",
  margin = "mx-auto"
}) => {
  return (
    <div className={`${margin} ${maxWidth} ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
