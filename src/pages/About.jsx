import React from "react";

function About() {
  return (
    <div className="flex min-h-screen  items-center  justify-center bg-gray-50 pt-10">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Section: Images and Stats */}
        <div className="space-y-6">
         

          {/* Product Image 2 */}
          <div className="flex flex-row rounded-lg bg-white shadow-md">
            <img
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJvb218ZW58MHx8MHx8fDA%3D"
              alt="Product 2"
              className="h-50 w-full rounded-lg"
            />
          </div>

          {/* Ratings */}
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-sm text-gray-600">Best ratings</p>
            <div className="mt-1 flex space-x-1">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span className="ml-2">😊👍😂😄</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div>
              <h3 className="text-2xl font-bold text-blue-900">30,000+</h3>
              <p className="text-sm text-gray-800">
                Sales in July 2021 with 5 star ratings and happy clients
              </p>
            </div>
            <span className="text-xl text-green-500">↑</span>
          </div>
        </div>

        {/* Right Section: About Us */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-orange-900">A BIT </h3>
          <h1 className="text-4xl font-bold"> ABOUT US</h1>
          <p className="text-sm font-semibold leading-relaxed text-gray-600">
            Welcome to Royal Heights – your ultimate destination for comfort,
            luxury, and a memorable stay. Located in the heart of the city,
            Royal Heights offers a perfect blend of modern amenities and
            traditional hospitality. Whether you're visiting for business,
            leisure, or a family vacation, we ensure your stay is comfortable,
            relaxing, and truly exceptional. Our hotel features elegantly
            designed rooms, fine dining restaurants, and top-tier facilities to
            cater to all your needs. From 24/7 room service to high-speed Wi-Fi,
            we provide everything you need to feel right at home. At Royal
            Heights, every guest is treated like family. Our dedicated staff is
            always ready to go the extra mile to make your experience enjoyable
            and stress-free. Come stay with us – and discover what makes Royal
            Heights the preferred choice for travelers from around the world.
          </p>
          <div className="flex flex-row rounded-lg bg-white shadow-md">
            <img
              src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2R8ZW58MHx8MHx8fDA%3D"
              alt="Product 2"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
