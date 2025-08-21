import React from "react";

const Section = ({ 
  children, 
  className = "", 
  padding = "py-12 lg:py-16",
  background = "bg-white",
  container = true,
  maxWidth = "max-w-7xl"
}) => {
  const content = container ? (
    <div className={`mx-auto px-4 lg:px-8 ${maxWidth}`}>
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section className={`${background} ${padding} ${className}`}>
      {content}
    </section>
  );
};

export default Section;
