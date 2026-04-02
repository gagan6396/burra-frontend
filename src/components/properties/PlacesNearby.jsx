import { useState } from "react";
import { Compass, Clock, Star, MapPin, Mountain, Coffee, TreePine, Landmark, Navigation, Image as ImageIcon } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const PlacesNearby = () => {
  const [imageErrors, setImageErrors] = useState({});

  const places = [
    {
      name: "Mall Road",
      distance: "3.5 km",
      duration: "15 mins drive",
      rating: 4.5,
      description: "The heart of Mussoorie with charming cafes, local shops, and stunning views of the Doon Valley. Perfect for evening strolls and shopping.",
      category: "Shopping & Dining",
      image: "/mall-road2.jpg",
      icon: Coffee,
      bgColor: "from-amber-100 to-amber-200",
      iconColor: "text-amber-600",
    },
    // {
    //   name: "Gun Hill",
    //   distance: "2.8 km",
    //   duration: "12 mins drive",
    //   rating: 4.6,
    //   description: "The second highest peak in Mussoorie offering panoramic views of the Himalayas. Accessible by cable car or trek.",
    //   category: "Viewpoint",
    //   image: "/gunhill.webp",
    //   icon: Mountain,
    //   bgColor: "from-blue-100 to-blue-200",
    //   iconColor: "text-blue-600",
    // },
    {
      name: "Kempty Falls",
      distance: "12 km",
      duration: "30 mins drive",
      rating: 4.3,
      description: "A stunning 40-foot waterfall surrounded by lush greenery. Perfect for a refreshing dip and picnic with family.",
      category: "Waterfall",
      image: "/kempty-fall.jfif",
      icon: TreePine,
      bgColor: "from-cyan-100 to-cyan-200",
      iconColor: "text-cyan-600",
    },
    {
      name: "Landour",
      distance: "4.2 km",
      duration: "20 mins drive",
      rating: 4.8,
      description: "A quaint cantonment town with colonial-era charm, famous for its bakeries, peaceful walks, and stunning views.",
      category: "Heritage Town",
      image: "/landour-street.webp",
      icon: Landmark,
      bgColor: "from-amber-100 to-amber-200",
      iconColor: "text-amber-600",
    },
    {
      name: "Company Garden",
      distance: "5.5 km",
      duration: "18 mins drive",
      rating: 4.2,
      description: "A beautifully landscaped garden with colorful flowers, boating facilities, and a charming café.",
      category: "Garden",
      image: "/company-garden.jfif",
      icon: TreePine,
      bgColor: "from-emerald-100 to-emerald-200",
      iconColor: "text-emerald-600",
    },
    {
      name: "Lal Tibba",
      distance: "5 km",
      duration: "20 mins drive",
      rating: 4.7,
      description: "The highest point in Mussoorie offering breathtaking sunrise and sunset views with telescopes for mountain viewing.",
      category: "Viewpoint",
      image: "/lal-tibba.webp",
      icon: Mountain,
      bgColor: "from-purple-100 to-purple-200",
      iconColor: "text-purple-600",
    },
  ];

  const handleImageError = (placeName) => {
    setImageErrors(prev => ({ ...prev, [placeName]: true }));
  };

  return (
    <>
    <Navbar/>
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Attractions Near <span className="text-green-600">Burra Bungalow</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the beauty of Mussoorie with these popular destinations just a short distance from our property
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-500">All distances are approximate by road</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place, index) => {
            const IconComponent = place.icon;
            const hasError = imageErrors[place.name];
            
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-stone-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  {!hasError ? (
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(place.name)}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${place.bgColor} flex items-center justify-center`}>
                      <IconComponent className={`w-16 h-16 ${place.iconColor}`} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {place.duration}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-600 text-amber-600" />
                    <span className="text-xs font-semibold text-gray-700">{place.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{place.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                    {place.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Landmark className="w-3 h-3" />
                      {place.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {place.distance}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show all button */}
        {/* <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 transition-all duration-300 font-medium">
            <Compass className="w-4 h-4" />
            Explore More Attractions
          </button>
        </div> */}
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default PlacesNearby;