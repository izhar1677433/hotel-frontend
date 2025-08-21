import React, { useState } from 'react';
import '../assets/styles/AnimatedGallery.css';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWtlbiUyMG1lYXR8ZW58MHx8MHx8fDA%3D',
    title: 'chicken karahii',
    description: '"Enjoy a smooth and hassle-free check-in experience with our friendly staff, ready to welcome you with comfort and care."'
  },
  {
    src: 'https://images.pexels.com/photos/20371512/pexels-photo-20371512/free-photo-of-top-view-of-a-plate-with-roasted-chicken.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg',
    title: 'chicken tikka',
    description: 'Savor the rich flavors of our perfectly grilled Chicken Tikka, marinated with traditional spices for an authentic taste experience.'
  },
  {
    src: 'https://images.pexels.com/photos/12565941/pexels-photo-12565941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg',
    title: 'chicken malai booti',
    description: 'Indulge in the creamy delight of our Chicken Malai Boti, tenderly grilled to perfection with rich, aromatic spices and a smooth, buttery marinade.'
  },
  {
    src: 'https://images.pexels.com/photos/17696653/pexels-photo-17696653/free-photo-of-chicken-wings-in-rice-with-saffron.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpeg',
    title: 'chicken biryani',
    description: 'Experience the royal taste of our aromatic biryani, layered with fragrant basmati rice, chicken pieces, and a perfect blend of traditional spices.'
  },
  {
    src: 'https://images.pexels.com/photos/5638541/pexels-photo-5638541.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load.jpeg',
    title: 'steam rice',
    description: 'Enjoy our perfectly steamed rice—light, fluffy, and the ideal companion to any flavorful dish'
  },
    {
    src: 'https://i.pinimg.com/736x/ac/be/c7/acbec7c6a8866058816aa31531003bfb.jpg',
    title: 'chapli kababs',
    description: 'Experience the bold flavors of our Chapli Kababs, crafted with minced meat and authentic spices for a true taste of tradition.'
  },
  {
    src: 'https://images.pexels.com/photos/15058850/pexels-photo-15058850/free-photo-of-a-plate-of-kebabs-with-vegetables-and-herbs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpeg',
    title: 'sekh kabab',
    description: 'Indulge in our juicy Seekh Kababs, expertly grilled to perfection with a blend of traditional spices.'
  }
,
];

const AnimatedGallery = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen   py-30">
      <h2 className="text-5xl font-bold mb-10 text-gray-800 tracking-tight">Foods Gallery</h2>
      <div className="relative w-full max-w-xl flex items-center justify-center">
        <button
          className="absolute left-0 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 text-2xl text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={prevSlide}
          aria-label="Previous"
        >
          &#10094;
        </button>
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-2xl bg-white"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={images[index].src}
                alt={images[index].title}
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">{images[index].title}</h2>
                <p className="text-base drop-shadow-lg">{images[index].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          className="absolute right-0 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 text-2xl text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={nextSlide}
          aria-label="Next"
        >
          &#10095;
        </button>
      </div>
      <div className="flex gap-2 mt-6">
        {images.map((img, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border-2 border-gray-400 transition-all duration-200 ${i === index ? 'bg-blue-500 border-blue-500 scale-125' : 'bg-white hover:bg-blue-200'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};



export default AnimatedGallery;