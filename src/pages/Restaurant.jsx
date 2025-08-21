import axios from "axios";
import React, { useEffect, useState } from "react";

const Restaurant = () => {
  return (
    <div className="md:px-25  bg-gray-50 py-20 px-10 pt-[250px]">
      <div className="mx-auto max-w-6xl pb-5 ">
        <h1 className="mb-1 inline-block border-b-4 border-red-500 text-4xl font-bold text-gray-800">
          Royal Heights Restaurant
        </h1>

        <p className="mb-8 text-lg text-gray-700">
          Experience fine dining at our in-house restaurant, offering a variety
          of local and international cuisines prepared by top chefs. Whether
          you're enjoying breakfast, a family lunch, or a romantic dinner — we
          have something for every taste.
        </p>

        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            What We Offer
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-gray-700">
            <li>Breakfast, Lunch & Dinner Buffets</li>
            <li>24/7 Room Service</li>
            <li>Outdoor and Rooftop Seating</li>
            <li>Special Dietary Options (Halal, Vegetarian, Vegan)</li>
            <li>Kids Menu & Custom Orders</li>
          </ul>
        </div>
        <div>
          {
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Half Fry Egg",
                  image:
                    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crohttps://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJyZWFrZmFzdHxlbnwwfHwwfHx8MA%3D%3Dp&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWtmYXN0fGVufDB8fDB8fHww",
                },
                {
                  name: "Breakfast",
                  image:
                    "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJyZWFrZmFzdHxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "Grilled Fish",
                  image:
                    "https://images.unsplash.com/photo-1611171711912-e3f6b536f532?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZpc2glMjBmb29kfGVufDB8fDB8fHww",
                },
                {
                  name: "Grilled and steam Fish",
                  image:
                    "https://images.unsplash.com/photo-1626497862618-4aa68df390fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGZpc2glMjBmb29kfGVufDB8fDB8fHww",
                },
                {
                  name: "Food And Drink",
                  image:
                    "https://plus.unsplash.com/premium_photo-1681841594224-ad729a249113?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlubmVyfGVufDB8fDB8fHww",
                },
                {
                  name: "Vegetable",
                  image:
                    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlubmVyfGVufDB8fDB8fHww",
                },
                {
                  name: "Pizza With Chiken",
                  image:
                    "https://plus.unsplash.com/premium_photo-1664471482655-126b77fb3395?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGlubmVyfGVufDB8fDB8fHww",
                },
                {
                  name: "Frinch Fries with Yougort",
                  image:
                    "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "Spagidy",
                  image:
                    "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "Cranchies",
                  image:
                    "https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "BBQ",
                  image:
                    "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lYXR8ZW58MHx8MHx8fDA%3D",
                },
                {
                  name: "Grilled Meat Steak",
                  image:
                    "https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lYXR8ZW58MHx8MHx8fDA%3D",
                },
                {
                  name: "zinger Burger",
                  image:
                    "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww",
                },
                {
                  name: "Shwarma",
                  image:
                    "https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNod2FybWF8ZW58MHx8MHx8fDA%3D",
                },
                {
                  name: "Chinese",
                  image:
                    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Spicy Biryani",
                  image:
                    "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                  name: "Fresh Caesar Salad",
                  image:
                    "https://plus.unsplash.com/premium_photo-1673590981774-d9f534e0c617?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsYWR8ZW58MHx8MHx8fDA%3D",
                },
                {
                  name: "Pasta",
                  image:
                    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFzdGF8ZW58MHx8MHx8fDA%3D",
                },
              ].map((dish, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl bg-white shadow-md group"
                >
                  {/* map((restaurant)) */}
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-48 w-full object-cover transform transition-transform duration-300 group-hover:scale-125"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {dish.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          }
          <div className="  mt-10 flex !w-full justify-center">
            <a href="/animated">
              <button className="mx-auto rounded-2xl bg-blue-600 px-7 py-3 text-center text-lg font-bold text-white hover:bg-gray-500 hover:text-black">
                Load more
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
