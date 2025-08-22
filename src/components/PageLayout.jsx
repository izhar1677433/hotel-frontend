import React from "react";

const PageLayout = ({
  children,
  title,
  subtitle,
  heroImage,
  className = "",
  showHero = false,
}) => {
  return (
    <div className={`min-h-screen w-screen ${className}`}>
      {/* Hero Section */}
      {showHero && (
        <section className="w-ll relative  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="absolute inset-0 bg-black/50" />
          {heroImage && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          )}
          <div className="relative z-10 w-full px-4 text-center sm:px-8 md:px-12">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mx-auto text-base text-gray-300 sm:text-lg md:text-xl">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="w-full flex-1">
        <div className="max-w-screen-2xl mx-auto w-full ">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
