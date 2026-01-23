import { useState } from "react";
import { X, ZoomIn, Camera, MapPin, Clock, Eye } from "lucide-react";

export default function ResortGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  // Define the exact order you want images to appear
  const imageOrder = [
    "parking.png",
    "/bu.jpeg", // First
    "/entt.png",
    "/ent1.jpeg",
    "https://r1imghtlak.mmtcdn.com/418cb0a47dd511ec913f0a58a9feac02.jpg?downsize=540:*", // Second
    "https://r1imghtlak.mmtcdn.com/293a5ab07dd511ecba6d0a58a9feac02.jpg?downsize=540:*", // Third
    "https://r1imghtlak.mmtcdn.com/292a561a7dd511ecb02f0a58a9feac02.jpg?downsize=540:*", // Fourth
    // "https://r1imghtlak.mmtcdn.com/3162652a7dd511ec913f0a58a9feac02.jpg?downsize=540:*", // Fifth
    "/11.webp",
    "https://r1imghtlak.mmtcdn.com/393beb227dd511ec913f0a58a9feac02.jpg?downsize=540:*", // Sixth
    "/1.webp",
    "/2.webp",
    "/6.webp",
    "/7.webp",
    "/20.webp",
    "/21.webp",
    "/4.webp",
    "/5.webp",
    "/9.webp",
    "/10.webp",
    "/24.webp",
    "/28.webp",
    "/26.webp",
    "/12.webp",
    // "https://r1imghtlak.mmtcdn.com/177e88967dd511ecba6d0a58a9feac02.jpg?downsize=540:*", // Seventh
    // "https://r1imghtlak.mmtcdn.com/39541f4e7dd511eca95f0a58a9feac02.jpg?downsize=540:*", // Eighth
    // "https://r1imghtlak.mmtcdn.com/34c2d340f68e11eb86710a58a9feac02.webp?downsize=540:*", // Ninth
    // "https://r1imghtlak.mmtcdn.com/3d69454cf68e11eb97d70a58a9feac02.webp?downsize=540:*", // Tenth
  ];

  const images = [
    {
      url: "/bu.jpeg",
      title: "Entrance",
      description: "Modern design meets natural beauty",
      category: "Nature",
      location: "Main Building",
      time: "Day",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/DTcFNh0kwum/", // Add Instagram Reel URL
    },
    {
      url: "/entt.png",
      title: "Tranquil Waters",
      description: "Peaceful lakes and flowing streams",
      category: "Nature",
      location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/DTRvQ-8k82S/", // Add Instagram Reel URL
    },
    {
      url: "/11.webp",
      title: "Tranquil Waters",
      description: "Peaceful lakes and flowing streams",
      category: "Sitting & Living Room",
      location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/12.webp",
      title: "Kitchen",
      // description: "Peaceful lakes and flowing streams",
      category: "Kitchen",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/1.webp",
      title: "Bedroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bedrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/2.webp",
      title: "Bedroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bedrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/6.webp",
      title: "Bedroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bedrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/7.webp",
      title: "Bedroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bedrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/20.webp",
      title: "Bedroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bedrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/21.webp",
      title: "Bedroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bedrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/26.webp",
      title: "Living Room",
      // description: "Peaceful lakes and flowing streams",
      category: "Living Room",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/4.webp",
      title: "Bathroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bathroom",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/5.webp",
      title: "Bathroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bathrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/9.webp",
      title: "Bathroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bathrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/10.webp",
      title: "Bathroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bathroom",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/24.webp",
      title: "Bathroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bathrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/28.webp",
      title: "Bathroom",
      // description: "Peaceful lakes and flowing streams",
      category: "Bathrooms",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    
    {
      url: "/parking.png",
      title: "Spacious parking space",
      description: "",
      category: "Nature",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
    {
      url: "/ent1.jpeg",
      title: "Burra Bungalow",
      // description: "Peaceful lakes and flowing streams",
      category: "Nature",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/entrance-view-reel/", // Add Instagram Reel URL
    },
   
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/418cb0a47dd511ec913f0a58a9feac02.jpg?downsize=540:*",
    //   title: "Forest Trails",
    //   description: "Quiet walks through dense greenery",
    //   category: "Nature",
    //   location: "Walking Trails",
    //   time: "Morning",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/forest-trails-reel/",
    // },
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/293a5ab07dd511ecba6d0a58a9feac02.jpg?downsize=540:*",
    //   title: "Forest Trails",
    //   description: "Quiet walks through dense greenery",
    //   category: "Nature",
    //   location: "Walking Trails",
    //   time: "Morning",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/forest-walk-reel/",
    // },
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/292a561a7dd511ecb02f0a58a9feac02.jpg?downsize=540:*",
    //   title: "Forest Trails",
    //   description: "Quiet walks through dense greenery",
    //   category: "Nature",
    //   location: "Walking Trails",
    //   time: "Morning",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/nature-trail-reel/",
    // },
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/3162652a7dd511ec913f0a58a9feac02.jpg?downsize=540:*",
    //   title: "Living Room",
    //   // description: "Peaceful lakes and flowing streams",
    //   category: "Sitting & Living Room",
    //   // location: "Resort Pool",
    //   time: "Afternoon",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/poolside-reel/", // Add Instagram Reel URL
    // },
    {
      url: "https://r1imghtlak.mmtcdn.com/393beb227dd511ec913f0a58a9feac02.jpg?downsize=540:*",
      title: "Living Room",
      // description: "Peaceful lakes and flowing streams",
      category: "Sitting & Living Room",
      // location: "Resort Pool",
      time: "Afternoon",
      size: "medium",
      instagramReelUrl: "https://www.instagram.com/reel/water-view-reel/", // Add Instagram Reel URL
    },
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/177e88967dd511ecba6d0a58a9feac02.jpg?downsize=540:*",
    //   title: "Luxury Interiors",
    //   description: "Elegant rooms with modern amenities",
    //   category: "Interior",
    //   location: "Deluxe Suite",
    //   time: "Evening",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/luxury-interior-reel/",
    // },
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/39541f4e7dd511eca95f0a58a9feac02.jpg?downsize=540:*",
    //   title: "Luxury Interiors",
    //   description: "Elegant rooms with modern amenities",
    //   category: "Interior",
    //   location: "Deluxe Suite",
    //   time: "Evening",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/suite-tour-reel/", // Add Instagram Reel URL
    // },
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/34c2d340f68e11eb86710a58a9feac02.webp?downsize=540:*",
    //   title: "Luxury Interiors",
    //   description: "Elegant rooms with modern amenities",
    //   category: "Interior",
    //   location: "Deluxe Suite",
    //   time: "Evening",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/interior-design-reel/", // Add Instagram Reel URL
    // },
    // {
    //   url: "https://r1imghtlak.mmtcdn.com/3d69454cf68e11eb97d70a58a9feac02.webp?downsize=540:*",
    //   title: "Luxury Interiors",
    //   description: "Elegant rooms with modern amenities",
    //   category: "Interior",
    //   location: "Deluxe Suite",
    //   time: "Evening",
    //   size: "medium",
    //   instagramReelUrl: "https://www.instagram.com/reel/deluxe-room-reel/", // Add Instagram Reel URL
    // },
  ];

  const categories = [
    "All",
    "Nature",
    // "Interior",
    "Sitting & Living Room",
    "Bedrooms",
    "Bathrooms",
    "Kitchen",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  // Function to sort images based on the predefined order
  const sortImagesInOrder = (imageArray) => {
    return [...imageArray].sort((a, b) => {
      return imageOrder.indexOf(a.url) - imageOrder.indexOf(b.url);
    });
  };

  // Filter images based on category, then sort them
  const filteredImages = sortImagesInOrder(
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory)
  );

  // Handle image click - opens Instagram Reel if URL exists, otherwise shows lightbox
  const handleImageClick = (img) => {
    if (img.instagramReelUrl) {
      // Open Instagram Reel in new tab
      window.open(img.instagramReelUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Show lightbox for images without Reel links
      setSelectedImage(img);
    }
  };

  // Rest of your component remains the same...
  const getGridClass = (index, size) => {
    const baseClass =
      "group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer";

    if (size === "large") {
      return `${baseClass} md:col-span-2 md:row-span-2 h-80 md:h-96`;
    }
    return `${baseClass} h-64`;
  };

  return (
    <section className="bg-gradient-to-br from-amber-50 via-white to-stone-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Camera className="w-4 h-4" />
            RESORT GALLERY
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#caa355] mb-6">
            Capture the Beauty
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the stunning landscapes and luxurious amenities
            that make Burra Bungalow an unforgettable destination
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-emerald-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md hover:shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
          {filteredImages.map((img, i) => (
            <div
              key={i}
              className={getGridClass(i, img.size)}
              onClick={() => handleImageClick(img)}
              onMouseEnter={() => setHoveredImage(i)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Content */}
              <div
                className={`absolute inset-0 flex flex-col justify-between p-6 text-white transform transition-all duration-300 ${
                  hoveredImage === i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {/* Top Icons */}
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {img.category}
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{img.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {img.description}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 text-xs opacity-80">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {img.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {img.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* View Count Badge */}
              <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-3 h-3" />
                {Math.floor(Math.random() * 500) + 100}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox - only shows for images without Instagram Reel links */}
      {selectedImage && !selectedImage.instagramReelUrl && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors duration-300 z-10"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300">
              <X className="w-6 h-6" />
            </div>
          </button>

          {/* Image Container */}
          <div className="relative max-w-5xl max-h-[90vh] mx-auto">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm opacity-80">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedImage.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedImage.time}
                  </div>
                  <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}