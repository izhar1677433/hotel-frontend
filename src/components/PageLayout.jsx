import React from "react";

const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  heroImage, 
  className = "",
  showHero = false
}) => {
  return (
    <div className={`min-h-screen w-full ${className}`}>
      {/* Hero Section */}
      {showHero && (
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-20 lg:py-32 w-full">
          <div className="absolute inset-0 bg-black/50" />
          {heroImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          )}
          <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="mx-auto text-base sm:text-lg md:text-xl text-gray-300">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 lg:py-12 max-w-screen-2xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
