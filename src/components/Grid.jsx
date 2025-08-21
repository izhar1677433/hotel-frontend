import React from "react";

const Grid = ({ 
  children, 
  className = "", 
  cols = 1,
  gap = "gap-6",
  responsive = true
}) => {
  const getGridCols = () => {
    if (!responsive) return `grid-cols-${cols}`;
    
    const breakpoints = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    };
    
    return breakpoints[cols] || breakpoints[1];
  };

  return (
    <div className={`grid ${getGridCols()} ${gap} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;
