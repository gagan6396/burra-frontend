import React from 'react';

const ParallaxBanner = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="bg1.mp4" type="video/mp4" />
        <source src="bg-video.webm" type="video/webm" />
        {/* Fallback image if video fails to load */}
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wide">
            Relax and Rejuvenate in Our Bungalow
          </h1>
          
          {/* Subtitle */}
          <div className="mb-8">
            <p className="text-2xl md:text-3xl font-serif italic mb-2">
              Burra Bungalow
            </p>
            <p className="text-lg md:text-xl font-light tracking-wider">
              A REFRESHING RETREAT IN THE HEART OF Mussoorie - PERFECT FOR LEISURE AND RELAXATION
            </p>
          </div>
          
          {/* Description */}
          <div className="max-w-2xl mx-auto mb-10">
            <p className="text-base md:text-lg leading-relaxed">
              Burra Bungalow offers the perfect escape, 
              surrounded by natural tranquility. Whether it's a romantic getaway or family fun, 
              enjoy a refreshing retreat at one of the best homestay in Mussoorie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBanner;