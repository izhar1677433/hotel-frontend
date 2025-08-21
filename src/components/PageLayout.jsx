import React from "react";

const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  heroImage, 
  className = "",
  showHero = false,
  maxWidth = "max-w-7xl"
}) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Hero Section */}
      {showHero && (
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-32">
          <div className="absolute inset-0 bg-black/50" />
          {heroImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          )}
          <div className="relative z-10 mx-auto px-4 text-center lg:px-8">
            <div className={maxWidth}>
              <h1 className="mb-4 text-4xl font-bold text-white lg:text-6xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mx-auto max-w-2xl text-lg text-gray-300 lg:text-xl">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className={`mx-auto px-4 py-8 lg:px-8 lg:py-12 ${maxWidth}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
