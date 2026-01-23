import { useState } from "react";
import {
  Flame,
  Tv,
  Droplets,
  Coffee,
  Zap,
  Bath,
  BedDouble,
  Armchair,
  TreePine,
  Home,
  Wifi,
} from "lucide-react";

const AmenitiesSection = () => {
  const [activeBungalow, setActiveBungalow] = useState('burra');

  const bungalows = {
    burra: {
      name: "Burr Bungalow",
      subtitle: "Luxury & Comfort",
      amenities: [
        { icon: Flame, title: "Room Heater", description: "Cozy warmth in winters" },
        { icon: Tv, title: "Smart TV", description: "Entertainment at your fingertips" },
        { icon: Droplets, title: "Hot Water", description: "24/7 hot water supply" },
        { icon: Coffee, title: "Tea/Coffee Setup", description: "Premium beverage station" },
        { icon: Zap, title: "Electric Kettle", description: "Quick and convenient" },
        { icon: Bath, title: "Private Bathroom", description: "Luxurious bath experience" },
        { icon: BedDouble, title: "Extra Linen", description: "Premium quality bedding" },
        { icon: Armchair, title: "Seating Area", description: "Comfortable lounge space" },
        { icon: TreePine, title: "Patios", description: "Private outdoor space" },
        { icon: Wifi, title: "WiFi", description: "High-speed internet" },
      ]
    },
    chota: {
      name: "Annexe",
      subtitle: "Cozy & Intimate",
      amenities: [
        { icon: Droplets, title: "Hot Water", description: "24/7 hot water supply" },
        { icon: Flame, title: "Room Heater", description: "Cozy warmth in winters" },
        // { icon: Tv, title: "Smart TV", description: "Entertainment at your fingertips" },
        { icon: Wifi, title: "WiFi", description: "High-speed internet" },
        // { icon: Coffee, title: "Tea/Coffee Setup", description: "Premium beverage station" },
        { icon: Bath, title: "Private Bathroom", description: "Luxurious bath experience" },
        // { icon: Zap, title: "Electric Kettle", description: "Quick and convenient" },
        { icon: TreePine, title: "Garden View", description: "Scenic outdoor views" },
        { icon: BedDouble, title: "Quality Linen", description: "Comfortable bedding" },
      ]
    }
  };

  const currentBungalow = bungalows[activeBungalow];

  return (
    <section className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4">
            Premium Amenities
          </h2>
          <p className="text-sm md:text-base text-emerald-700 max-w-2xl mx-auto">
            Experience comfort with our carefully curated amenities designed for your stay
          </p>
        </div>

        {/* Bungalow Selector Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setActiveBungalow('burra')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeBungalow === 'burra'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400'
            }`}
          >
            <Home className="w-4 h-4 inline-block mr-2" />
            Burra Bungalow
          </button>
          <button
            onClick={() => setActiveBungalow('chota')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeBungalow === 'chota'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400'
            }`}
          >
            <Home className="w-4 h-4 inline-block mr-2" />
            Annexe
          </button>
        </div>

        {/* Bungalow Title */}
        {/* <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-emerald-800 mb-1">
            {currentBungalow.name}
          </h3>
          <p className="text-sm text-emerald-600 italic">
            {currentBungalow.subtitle}
          </p>
        </div> */}

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentBungalow.amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-emerald-100 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 text-center"
              >
                <div className="mb-3 flex justify-center">
                  <div className="p-2 rounded-full bg-emerald-50 text-emerald-600">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-xs font-semibold text-emerald-900 mb-1">
                  {amenity.title}
                </h4>
                <p className="text-xs text-emerald-600">
                  {amenity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;