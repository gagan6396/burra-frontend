import { 
  Leaf, 
  Sparkles, 
  Mountain, 
  Heart,
  Star,
  Users,
  Award,
  Camera,
  Compass,
  TreePine,
  Waves,
  Sun
} from "lucide-react";

const experiences = [
  {
    title: "Peace & Privacy",
    description:
      "Thoughtfully designed spaces that offer uninterrupted calm, allowing you to truly disconnect and unwind in complete serenity.",
    icon: Leaf,
    color: "emerald",
    features: ["Private Balconies", "Outdoor sitouts", "Quiet Zones"]
  },
  {
    title: "Luxury with Warmth",
    description:
      "Refined comfort blended with heartfelt hospitality that feels personal, creating an atmosphere of elegant intimacy.",
    icon: Sparkles,
    color: "amber",
    features: ["Personal Butler", "Premium Amenities", "Warm Service"]
  },
  {
    title: "Nature-First Living",
    description:
      "Wake up to misty mornings, fresh mountain air, and landscapes that soothe the soul while connecting you to nature's rhythm.",
    icon: Mountain,
    color: "emerald",
    features: ["Mountain Views", "Forest Trails", "Fresh Air"]
  },
  {
    title: "Personalized Experiences",
    description:
      "From curated stays to intimate moments, every experience is thoughtfully shaped around your preferences and desires.",
    icon: Heart,
    color: "amber",
    features: ["Custom Itineraries", "Special Occasions", "Tailored Service"]
  },
];

const additionalExperiences = [
  {
    title: "Adventure & Exploration",
    description: "Discover hidden trails, scenic viewpoints, and thrilling outdoor activities in the heart of Uttarakhand.",
    icon: Compass,
    color: "emerald"
  },
  {
    title: "Wellness & Rejuvenation",
    description: "Restore your mind and body with our spa treatments, yoga sessions, and meditation spaces.",
    icon: Sun,
    color: "amber"
  },
  {
    title: "Culinary Excellence",
    description: "Savor authentic local flavors and international cuisine crafted by our expert culinary team.",
    icon: Star,
    color: "emerald"
  },
  {
    title: "Cultural Immersion",
    description: "Experience the rich heritage and traditions of Uttarakhand through curated cultural activities.",
    icon: Users,
    color: "amber"
  }
];

const ExperienceSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-amber-50 via-white to-stone-50 py-24 px-4 md:px-10 overflow-hidden relative">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-amber-200">
            <Sparkles className="w-4 h-4" />
            UNIQUE EXPERIENCES
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            Crafted for Your
            <span className="block text-emerald-600">Perfect Escape</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            More than just a stay, we offer transformative experiences crafted around comfort, 
            nature, and moments that create lasting memories long after you leave.
          </p>
        </div>

        {/* Main Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {experiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${item.color}-100 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {item.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className={`w-1.5 h-1.5 bg-${item.color}-400 rounded-full`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Experiences */}
        {/* <div className="bg-white/60 bg-[url('board.png')] backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-20">
          <div className="text-center  mb-12">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Beyond Accommodation
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover a world of possibilities that extend far beyond your room, 
              creating a holistic experience of luxury and adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalExperiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-${item.color}-100 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className={`w-10 h-10 text-${item.color}-600`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white">
            <h4 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Ready to Create Your Perfect Experience?
            </h4>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Let us craft a personalized journey that combines luxury, nature, and unforgettable moments 
              tailored specifically for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.airbnb.co.in/users/show/79784690" target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                Plan Your Stay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;