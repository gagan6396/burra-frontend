import React from "react";
import { Home, Wifi, Zap, BedDouble, Sun, BookOpen, Mountain, Star, Users } from "lucide-react";

const AdditionalAccommodationSection = () => {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      {/* Decorative border */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400 rounded-full"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="w-4 h-4 bg-amber-300 rounded-full"></div>
            <div className="w-4 h-4 bg-amber-200 rounded-full"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Additional Details
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A separate space on the same property, perfect for extended families or independent stays
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Introductory Paragraph */}
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Separated by a gate yet set on the same property, right beside the main bungalow, 
                is this additional accommodation space.
              </p>
            </div>

            {/* Modern Comforts */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Modern Amenities</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Wifi, text: "High-speed Wi-Fi", color: "bg-blue-100 text-blue-700" },
                  { icon: Zap, text: "Electric fireplace", color: "bg-red-100 text-red-700" },
                  { icon: BedDouble, text: "Electric blankets", color: "bg-purple-100 text-purple-700" },
                  { icon: Home, text: "Separate entrance", color: "bg-emerald-100 text-emerald-700" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 ${item.color.split(' ')[0]} rounded-lg flex items-center justify-center`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Options */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-200">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Flexible Configuration</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Combine with Main Bungalow</h4>
                    <p className="text-gray-600 mt-1">
                      Perfect for larger gatherings of up to <span className="font-bold text-amber-700">ten guests total</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Home className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Stay Independently</h4>
                    <p className="text-gray-600 mt-1">
                      Ideal for <span className="font-bold text-emerald-700">couples or smaller groups</span> of up to four
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Rooms and Features */}
          <div className="space-y-8">
            {/* Upper Level */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Upper Floor</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Two Beautiful Bedrooms</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <BedDouble className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-700">Four-poster beds with private bathrooms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Sun className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-700">Stunning east-facing Himalayan views</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">Wake up to sunrise views of Surkanda Devi temple</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Lower Level */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Ground Floor</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Sunlit Reading Room</h4>
                  <p className="text-gray-600 mb-4">
                    Features a special collection of rare books from our family's personal library (available upon request)
                  </p>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">Family book collection access</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Comfortable Living & Dining Area</h5>
                    </div>
                  </div>
                  
                  {/* <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 text-blue-700">🛁</div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Guest Washroom</h5>
                    </div>
                  </div> */}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 text-red-700">🍳</div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Complete Kitchen Setup</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outdoor Space */}
            {/* <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold">Private Backyard</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-200 leading-relaxed">
                  Step outside to a sheltered backyard surrounded by lush bamboo, featuring a central bonfire area.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    "Starlit mountain nights",
                    "Panoramic forest views",
                    "Cozy bonfire gatherings",
                    "Music-filled evenings"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-sm text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-amber-200 italic">
                    "Perfect evenings under clear skies—watching the hills, toasting treats by the fire, 
                    and enjoying your favourite music in this tranquil setting."
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalAccommodationSection;