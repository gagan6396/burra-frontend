import { useState, useEffect } from "react";
import {
  Users,
  Bed,
  Bath,
  Coffee,
  Utensils,
  MapPin,
  Wifi,
  Car,
  Droplets,
  Trees,
  Sun,
  Moon,
  ChefHat,
  Sparkles,
  Home,
  Tv,
  CloudSun,
  Wind,
  Calendar,
  Clock,
  Users as Staff,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Users as GuestIcon,
  Award,
} from "lucide-react";
import { useRef } from "react";
const rooms = [
  {
    title: "Burra Bungalow",
    description:
      "Our spacious bungalow offers a perfect balance of comfort and understated luxury for families or groups visiting Mussoorie. Featuring three elegantly appointed bedrooms with heated blankets, two patios eastern and western facing, premium amenities, and serene, panoramic views, it promises a warm and restful retreat in every season. Step onto the private patios to soak in serene, panoramic views of the surrounding landscape perfect for slow mornings with a cup of tea or quiet evenings under the open sky. Complemented by premium amenities, generous living spaces, and abundant natural light, every detail has been carefully considered to create an atmosphere of relaxation and ease.",
    features: [
      { icon: Bed, text: "Three bedrooms" },
      { icon: Users, text: "Accommodates up to 6 adults" },
      { icon: Bath, text: "Three attached Bathroom" },
      { icon: Coffee, text: "Living room cum dinning area" },
    ],
    specs: {
      size: "31 ft x 18 ft",
      balcony: "12 ft x 5 ft private patios",
      view: "Garden & Mountain Views",
    },
    price: "₹8,500",
    rating: 4.8,
    images: [
      "/1.webp",
      "/2.webp",
      "/3.webp",
      "/4.webp",
      "/5.webp",
      "/6.webp",
      "/7.webp",
      "/8.webp",
      "/9.webp",
      "/10.webp",
      "/11.webp",
      "/12.webp",
    ],
    badge: "Most Popular",
  },
  {
    title: "Annexe",
    description:
      "Experience authentic luxury in our handcrafted annexe, thoughtfully designed to blend natural charm with refined comfort. The annexe features two beautifully crafted bedrooms with heated blankets, ensuring a warm and cozy stay even during cooler mountain nights. Step out onto the private gallery to take in panoramic forest views, where the sights and sounds of nature create a deeply calming atmosphere. Inside, elegant pinewood interiors, warm textures, and carefully curated details enhance the sense of quiet sophistication.",
    features: [
      { icon: Bed, text: "Two bedrooms" },
      { icon: Users, text: "Perfect for families" },
      { icon: Bath, text: "Attached bathroom" },
      { icon: Utensils, text: "Sittng cum dinning area" },
    ],
    specs: {
      size: "30 ft x 12 ft",
      material: "Premium Pinewood Construction",
      view: "Forest & Valley Views",
    },
    price: "₹12,000",
    rating: 4.9,
    images: [
      "/20.webp",
      "/21.webp",
      "/22.webp",
      "/23.webp",
      "/24.webp",
      "/25.webp",
      "/26.webp",
      "/27.webp",
      "/28.webp",
      "/29.webp",
      "/30.webp",
      "/31.webp",
    ],
    badge: "Premium",
  },
];

const RoomsSection = () => {
  const [selectedImages, setSelectedImages] = useState(
    rooms.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(
    rooms.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [thumbnailsToShow, setThumbnailsToShow] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
    roomType: "Burra Bungalow", // Default room type
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef(null);

  const BASE_URLL = "http://localhost:5001";

  // Handle responsive thumbnail count
  useEffect(() => {
    const updateThumbnailCount = () => {
      if (window.innerWidth < 640) {
        setThumbnailsToShow(3); // Mobile
      } else if (window.innerWidth < 1024) {
        setThumbnailsToShow(4); // Tablet
      } else {
        setThumbnailsToShow(5); // Desktop
      }
    };

    updateThumbnailCount();
    window.addEventListener('resize', updateThumbnailCount);
    return () => window.removeEventListener('resize', updateThumbnailCount);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    // Close modal on Escape key
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleImageSelect = (roomIndex, imageIndex) => {
    setSelectedImages((prev) => ({
      ...prev,
      [roomIndex]: imageIndex,
    }));
  };

  const handlePrevImage = (roomIndex) => {
    const room = rooms[roomIndex];
    setSelectedImages((prev) => ({
      ...prev,
      [roomIndex]:
        prev[roomIndex] === 0 ? room.images.length - 1 : prev[roomIndex] - 1,
    }));
  };

  const handleNextImage = (roomIndex) => {
    const room = rooms[roomIndex];
    setSelectedImages((prev) => ({
      ...prev,
      [roomIndex]:
        prev[roomIndex] === room.images.length - 1 ? 0 : prev[roomIndex] + 1,
    }));
  };

  const handleThumbnailPrev = (roomIndex) => {
    setThumbnailStartIndex((prev) => ({
      ...prev,
      [roomIndex]: Math.max(0, prev[roomIndex] - 1),
    }));
  };

  const handleThumbnailNext = (roomIndex) => {
    const room = rooms[roomIndex];
    const maxStart = Math.max(0, room.images.length - thumbnailsToShow);
    setThumbnailStartIndex((prev) => ({
      ...prev,
      [roomIndex]: Math.min(maxStart, prev[roomIndex] + 1),
    }));
  };

  const openModal = (roomType = "Burra Bungalow") => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "2",
      message: "",
      roomType: roomType,
    });
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await fetch(`${BASE_URLL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          guests: "2",
          message: "",
          roomType: "Burra Bungalow",
        });
        closeModal(); // Close modal after successful submission
      }, 3000);
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ✅ GROUPED CONTACT INFO */
  const contactInfo = [
    {
      icon: Phone,
      title: "For Reservations",
      items: [
        { text: "+91 9810301645", href: "tel:+919810301645" },
        { text: "+91 9848155496", href: "tel:+919848155496" },
      ],
    },
    {
      icon: Mail,
      title: "Email Inquiries",
      items: [
        {
          text: "mrinalinipahawa@gmail.com",
          href: "mailto:mrinalinipahawa@gmail.com",
        },
        {
          text: "rageshrir@gmail.com",
          href: "mailto:rageshrir@gmail.com",
        },
      ],
    },
    {
      icon: MapPin,
      title: "Our Location",
      items: [
        {
          text: (
            <>
              Burra Bungalow<br />
              Savitri Bhawan (Near Wyneberg Junior School)<br />
              Rajpur Road, Mussoorie<br />
              Uttarakhand 248197
            </>
          ),
          href: "#",
        },
      ],
    },
  ];

  return (
    <>
      <section className="w-full bg-gradient-to-br from-amber-50 via-white to-stone-50 py-20 px-4 md:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              LUXURY ACCOMMODATIONS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#caa355] mb-6">
              Our Luxurious Rooms
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Experience unparalleled comfort and elegance in our thoughtfully
              designed accommodations, where every detail is crafted for your
              perfect stay
            </p>
          </div>

          {/* Burra Bungalow Section */}
          <div className="space-y-10">
            {/* Burra Bungalow Heading - VISIBLE ONLY ON MOBILE */}
            <div className="lg:hidden text-center">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#a08144] mb-4">
                Burra Bungalow
              </h3>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                Most Popular
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image Gallery Section */}
              <div className="relative lg:order-1">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl group">
                    <img
                      src={rooms[0].images[selectedImages[0]]}
                      alt={`${rooms[0].title} - Image ${selectedImages[0] + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevImage(0)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => handleNextImage(0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Thumbnail Gallery with Navigation */}
                  <div className="relative flex items-center gap-1 sm:gap-2 w-full">
                    {/* Left Arrow */}
                    <button
                      onClick={() => handleThumbnailPrev(0)}
                      disabled={thumbnailStartIndex[0] === 0}
                      className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        thumbnailStartIndex[0] === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-110"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Thumbnails Container */}
                    <div className="flex gap-1.5 sm:gap-2 md:gap-3 flex-1 justify-center overflow-hidden">
                      {rooms[0].images
                        .slice(
                          thumbnailStartIndex[0],
                          thumbnailStartIndex[0] + thumbnailsToShow
                        )
                        .map((image, imgIdx) => {
                          const actualIndex = thumbnailStartIndex[0] + imgIdx;
                          return (
                            <button
                              key={actualIndex}
                              onClick={() => handleImageSelect(0, actualIndex)}
                              className={`relative flex-1 min-w-0 aspect-[4/3] max-w-[80px] sm:max-w-[100px] md:max-w-[120px] rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                                selectedImages[0] === actualIndex
                                  ? "ring-2 sm:ring-3 ring-amber-500 ring-offset-1 sm:ring-offset-2 scale-105"
                                  : "hover:scale-105 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={image}
                                alt={`${rooms[0].title} thumbnail ${actualIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {selectedImages[0] === actualIndex && (
                                <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-500 rounded-lg sm:rounded-xl"></div>
                              )}
                            </button>
                          );
                        })}
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={() => handleThumbnailNext(0)}
                      disabled={
                        thumbnailStartIndex[0] >=
                        rooms[0].images.length - thumbnailsToShow
                      }
                      className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        thumbnailStartIndex[0] >=
                        rooms[0].images.length - thumbnailsToShow
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-110"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-8 lg:order-2">
                {/* Burra Bungalow Heading - VISIBLE ONLY ON DESKTOP */}
                <div className="hidden lg:block space-y-4">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#a08144]">
                    Burra Bungalow
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-black leading-relaxed">
                    {rooms[0].description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {rooms[0].features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 transition-colors"
                      >
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-amber-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => openModal("Burra Bungalow")}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Property Highlights Section - AFTER BURRA BUNGALOW */}
          <div className="mt-32 pt-20 border-t border-gray-200 relative overflow-hidden">
            {/* LARGE VINES FOR PROPERTY HIGHLIGHTS SECTION ONLY */}
            
            {/* HUGE Left vine - positioned at VERY left edge of Property Highlights section */}
            <img 
              src="/vine.png" 
              alt=""
              className="absolute left-0 top-1/4 w-40 md:w-56 lg:w-72 h-[80vh] opacity-70 pointer-events-none z-0 animate-property-vine-left"
              style={{ 
                transform: 'scaleY(-1) rotate(5deg)',
                animationDelay: '0.2s',
                animationFillMode: 'both',
                filter: 'drop-shadow(4px 8px 12px rgba(0,0,0,0.4))',
                objectFit: 'cover',
                objectPosition: 'left center'
              }}
            />
            
            {/* HUGE Right vine - positioned at VERY right edge of Property Highlights section */}
            <img 
              src="/vine.png" 
              alt=""
              className="absolute right-0 top-1/4 w-40 md:w-56 lg:w-72 h-[80vh] opacity-70 pointer-events-none z-0 animate-property-vine-right"
              style={{ 
                transform: 'scaleY(1) rotate(-5deg)',
                animationDelay: '0.5s',
                animationFillMode: 'both',
                filter: 'drop-shadow(4px 8px 12px rgba(0,0,0,0.4))',
                objectFit: 'cover',
                objectPosition: 'right center'
              }}
            />
            
            {/* Additional decorative vines for depth */}
            <img 
              src="/vine.png" 
              alt=""
              className="absolute left-4 md:left-6 top-1/3 w-24 md:w-32 lg:w-40 h-[60vh] opacity-50 pointer-events-none z-0 animate-property-vine-left"
              style={{ 
                transform: 'scaleY(0.9) rotate(8deg)',
                animationDelay: '0.8s',
                animationFillMode: 'both',
                objectFit: 'cover',
                objectPosition: 'left center'
              }}
            />
            
            <img 
              src="/vine.png" 
              alt=""
              className="absolute right-4 md:right-6 bottom-1/4 w-24 md:w-32 lg:w-40 h-[60vh] opacity-50 pointer-events-none z-0 animate-property-vine-right"
              style={{ 
                transform: 'scaleY(0.9) rotate(-8deg)',
                animationDelay: '1s',
                animationFillMode: 'both',
                objectFit: 'cover',
                objectPosition: 'right center'
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {/* Main Features Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Key Features Grid */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                    Property Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: Car, text: "Parking for 3 cars", color: "bg-blue-100 text-blue-700" },
                      { icon: Droplets, text: "24×7 spring water", color: "bg-cyan-100 text-cyan-700" },
                      { icon: Wifi, text: "Good Wi-Fi connectivity", color: "bg-purple-100 text-purple-700" },
                      { icon: Tv, text: "Large TV in lobby", color: "bg-red-100 text-red-700" },
                      { icon: CloudSun, text: "Spacious light-filled rooms", color: "bg-yellow-100 text-yellow-700" },
                      { icon: Wind, text: "High wooden beamed ceiling", color: "bg-brown-100 text-brown-700" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                      >
                        <div className={`w-10 h-10 ${feature.color.split(' ')[0]} rounded-lg flex items-center justify-center shrink-0`}>
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bedrooms Section - From Image Content */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                    Bedrooms
                  </h3>
                  
                  {/* Blue Bedroom - Existing */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Sun className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Blue Bedroom</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Facing east, perfect for early risers who enjoy watching the sunrise from the comfort of their bed
                      </p>
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        Attached bathroom
                      </div>
                    </div>
                  </div>

                  {/* Green Bedroom - From Image */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl border border-emerald-100">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                      <Moon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Green Bedroom</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Facing west, bathed in warm afternoon light—ideal for late risers
                      </p>
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        Attached bathroom
                      </div>
                    </div>
                  </div>

                  {/* Forest View Room - From Image */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-white rounded-xl border border-amber-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                      <Trees className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Forest View Room</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Smaller and wonderfully cosy, offers beautiful sunlit view of the forest
                      </p>
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        Attached bathroom
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kitchen and Amenities */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                    Kitchen & Amenities
                  </h3>
                  <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-200">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Utensils className="w-6 h-6 text-amber-700" />
                        <h4 className="font-semibold text-gray-900">Spacious Kitchen</h4>
                      </div>
                      <p className="text-gray-700">
                        Fully equipped with refrigerator, gas stove, microwave, oven, washing machine, and iron.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Column - From Image Content */}
              <div className="space-y-8">
                {/* Additional Facilities - From Image */}
                <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-200">
                  <h4 className="text-lg font-semibold text-emerald-900 mb-4">
                    Additional Facilities
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Home className="w-3 h-3 text-emerald-700" />
                      </div>
                      <span className="text-sm text-gray-700">
                        Separate driver/nanny room with attached bathroom (additional charge)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Trees className="w-3 h-3 text-emerald-700" />
                      </div>
                      <span className="text-sm text-gray-700">
                        Large patios on either side of the bungalow
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3 text-emerald-700" />
                      </div>
                      <span className="text-sm text-gray-700">
                        Wood and coal-fired sigri for evening gatherings
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Daily Experience - From Image */}
                <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-amber-700" />
                    <h4 className="text-lg font-semibold text-amber-900">Daily Experience</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Typical Day:
                      </h5>
                      <ul className="space-y-2">
                        {[
                          "Explore the hill station during the day",
                          "Return to hot pakodas and tea in late afternoon",
                          "Evening sigri with steaming hot momos served by our cook",
                          "Dinner at home while unwinding"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt=1.5"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-amber-100">
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Staff className="w-4 h-4" />
                        Staff Services:
                      </h5>
                      <ul className="space-y-2">
                        {[
                          "Two full-time house staff live on the property",
                          "Take care of cooking, cleaning, and daily needs",
                          "Allow you to truly relax and create cherished memories"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Perfect For */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200">
                  <h4 className="text-lg font-semibold text-amber-900 mb-4">
                    Perfect For
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Couples seeking privacy",
                      "Families reconnecting",
                      "Friend getaways",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/80 p-3 rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Annexe Section - AFTER PROPERTY HIGHLIGHTS */}
          <div className="mt-32 pt-20 border-t border-gray-200">
            {/* Annexe Heading - VISIBLE ONLY ON MOBILE */}
            <div className="lg:hidden text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#a08144] mb-4">
                Annexe
              </h3>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold">
                Premium
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image Gallery Section */}
              <div className="relative lg:order-2">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl group">
                    <img
                      src={rooms[1].images[selectedImages[1]]}
                      alt={`${rooms[1].title} - Image ${selectedImages[1] + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevImage(1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => handleNextImage(1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Thumbnail Gallery with Navigation */}
                  <div className="relative flex items-center gap-1 sm:gap-2 w-full">
                    {/* Left Arrow */}
                    <button
                      onClick={() => handleThumbnailPrev(1)}
                      disabled={thumbnailStartIndex[1] === 0}
                      className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        thumbnailStartIndex[1] === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-110"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Thumbnails Container */}
                    <div className="flex gap-1.5 sm:gap-2 md:gap-3 flex-1 justify-center overflow-hidden">
                      {rooms[1].images
                        .slice(
                          thumbnailStartIndex[1],
                          thumbnailStartIndex[1] + thumbnailsToShow
                        )
                        .map((image, imgIdx) => {
                          const actualIndex = thumbnailStartIndex[1] + imgIdx;
                          return (
                            <button
                              key={actualIndex}
                              onClick={() => handleImageSelect(1, actualIndex)}
                              className={`relative flex-1 min-w-0 aspect-[4/3] max-w-[80px] sm:max-w-[100px] md:max-w-[120px] rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                                selectedImages[1] === actualIndex
                                  ? "ring-2 sm:ring-3 ring-amber-500 ring-offset-1 sm:ring-offset-2 scale-105"
                                  : "hover:scale-105 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={image}
                                alt={`${rooms[1].title} thumbnail ${actualIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {selectedImages[1] === actualIndex && (
                                <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-500 rounded-lg sm:rounded-xl"></div>
                              )}
                            </button>
                          );
                        })}
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={() => handleThumbnailNext(1)}
                      disabled={
                        thumbnailStartIndex[1] >=
                        rooms[1].images.length - thumbnailsToShow
                      }
                      className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        thumbnailStartIndex[1] >=
                        rooms[1].images.length - thumbnailsToShow
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-110"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-8 lg:order-1">
                {/* Annexe Heading - VISIBLE ONLY ON DESKTOP */}
                <div className="hidden lg:block space-y-4">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#a08144]">
                    Annexe
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold">
                    Premium
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-black leading-relaxed">
                    {rooms[1].description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {rooms[1].features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 transition-colors"
                      >
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-amber-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => openModal("Annexe")}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dining Section */}
          <div className="mt-32 pt-20 border-t border-gray-200">
            <img src="/vine1.png" alt="" className="object-contain w-auto h-full" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image Section */}
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src="/dinning.webp"
                  alt="Dining Experience"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
                    <Utensils className="w-4 h-4" />
                    CULINARY EXCELLENCE
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                    A Classic Culinary Experience
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Step into a world where time-honoured recipes, refined
                    techniques, and thoughtful presentation come together at the
                    table. Our classic culinary experience celebrates authentic
                    flavours crafted with care, using quality ingredients and
                    traditional methods that let each dish speak for itself.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {[
                    "Wholesome home cooked meals",
                    "Scenic mountain views",
                    "Personalized service",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          /* Property Highlights vine animations */
          @keyframes property-vine-left {
            0% {
              opacity: 0;
              transform: scaleY(-1) rotate(5deg) translateX(-150px) translateY(-50px);
              filter: blur(20px) drop-shadow(4px 8px 12px rgba(0,0,0,0));
            }
            20% {
              opacity: 0.3;
              transform: scaleY(-1) rotate(5deg) translateX(-100px) translateY(-30px);
              filter: blur(15px) drop-shadow(4px 8px 12px rgba(0,0,0,0.1));
            }
            40% {
              opacity: 0.5;
              transform: scaleY(-1) rotate(5deg) translateX(-50px) translateY(-15px);
              filter: blur(10px) drop-shadow(4px 8px 12px rgba(0,0,0,0.2));
            }
            60% {
              opacity: 0.7;
              transform: scaleY(-1) rotate(5deg) translateX(-20px) translateY(-5px);
              filter: blur(5px) drop-shadow(4px 8px 12px rgba(0,0,0,0.3));
            }
            80% {
              opacity: 0.75;
              transform: scaleY(-1) rotate(5deg) translateX(5px) translateY(2px);
              filter: blur(2px) drop-shadow(4px 8px 12px rgba(0,0,0,0.35));
            }
            100% {
              opacity: 0.7;
              transform: scaleY(-1) rotate(5deg) translateX(0) translateY(0);
              filter: drop-shadow(4px 8px 12px rgba(0,0,0,0.4));
            }
          }
          
          @keyframes property-vine-right {
            0% {
              opacity: 0;
              transform: scaleY(1) rotate(-5deg) translateX(150px) translateY(-50px);
              filter: blur(20px) drop-shadow(4px 8px 12px rgba(0,0,0,0));
            }
            20% {
              opacity: 0.3;
              transform: scaleY(1) rotate(-5deg) translateX(100px) translateY(-30px);
              filter: blur(15px) drop-shadow(4px 8px 12px rgba(0,0,0,0.1));
            }
            40% {
              opacity: 0.5;
              transform: scaleY(1) rotate(-5deg) translateX(50px) translateY(-15px);
              filter: blur(10px) drop-shadow(4px 8px 12px rgba(0,0,0,0.2));
            }
            60% {
              opacity: 0.7;
              transform: scaleY(1) rotate(-5deg) translateX(20px) translateY(-5px);
              filter: blur(5px) drop-shadow(4px 8px 12px rgba(0,0,0,0.3));
            }
            80% {
              opacity: 0.75;
              transform: scaleY(1) rotate(-5deg) translateX(-5px) translateY(2px);
              filter: blur(2px) drop-shadow(4px 8px 12px rgba(0,0,0,0.35));
            }
            100% {
              opacity: 0.7;
              transform: scaleY(1) rotate(-5deg) translateX(0) translateY(0);
              filter: drop-shadow(4px 8px 12px rgba(0,0,0,0.4));
            }
          }
          
          /* Subtle sway animation for property vines */
          @keyframes property-vine-sway {
            0%, 100% {
              transform: scaleY(-1) rotate(5deg) translateX(0) translateY(0);
            }
            25% {
              transform: scaleY(-1) rotate(5deg) translateX(-8px) translateY(-5px) rotate(-0.8deg);
            }
            50% {
              transform: scaleY(-1) rotate(5deg) translateX(0) translateY(0);
            }
            75% {
              transform: scaleY(-1) rotate(5deg) translateX(8px) translateY(5px) rotate(0.8deg);
            }
          }
          
          .animate-property-vine-left {
            animation: property-vine-left 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, 
                       property-vine-sway 7s ease-in-out infinite 2.5s;
          }
          
          .animate-property-vine-right {
            animation: property-vine-right 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, 
                       property-vine-sway 7s ease-in-out infinite 2.7s;
          }
        `}</style>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeModal}
          ></div>
          
          {/* Modal container */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-300"
          >
            {/* Modal header */}
            <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    <MessageSquare className="w-4 h-4" />
                    BOOK YOUR STAY - {formData.roomType.toUpperCase()}
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    Plan Your Perfect{" "}
                    <span className="text-[#caa355]">Getaway</span>
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-8">
              {isSubmitted ? (
                // Success message
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your inquiry has been received successfully. Our team will contact
                    you within 2 hours.
                  </p>
                  <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 max-w-md mx-auto">
                    <p className="text-emerald-800 font-medium">
                      Booking Reference: #BH{Date.now().toString().slice(-6)}
                    </p>
                    <p className="text-emerald-700 text-sm mt-2">
                      Room Type: {formData.roomType}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                // Form
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Contact Info */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-6 h-full">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        {contactInfo.map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-xl bg-white"
                            >
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm mb-1">
                                  {item.title}
                                </p>
                                <div className="space-y-1">
                                  {item.items.map((sub, j) => (
                                    <a
                                      key={j}
                                      href={sub.href}
                                      className="block text-gray-600 text-xs hover:text-emerald-600 transition-colors"
                                    >
                                      {sub.text}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {/* Room Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Room Type *</label>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select 
                            name="roomType" 
                            value={formData.roomType} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-gray-900"
                          >
                            <option value="Burra Bungalow">Burra Bungalow</option>
                            <option value="Annexe">Annexe</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="text" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleChange} 
                              placeholder="Enter your full name"
                              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-900 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200"}`} 
                            />
                            {errors.name && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.name}</div>}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="email" 
                              name="email" 
                              value={formData.email} 
                              onChange={handleChange} 
                              placeholder="Enter your email"
                              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-900 ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`} 
                            />
                            {errors.email && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.email}</div>}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            placeholder="+91 98765 43210"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-900 ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-200"}`} 
                          />
                          {errors.phone && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.phone}</div>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="date" 
                              name="checkIn" 
                              value={formData.checkIn} 
                              onChange={handleChange} 
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-500 text-gray-900" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="date" 
                              name="checkOut" 
                              value={formData.checkOut} 
                              onChange={handleChange} 
                              min={formData.checkIn || new Date().toISOString().split("T")[0]}
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-500 text-gray-900" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                          <div className="relative">
                            <GuestIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select 
                              name="guests" 
                              value={formData.guests} 
                              onChange={handleChange} 
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-gray-900"
                            >
                              {[1, 2, 3, 4, 5, 6].map((n) => (
                                <option key={n} value={n}>
                                  {n} Guest{n > 1 ? "s" : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests *</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            rows="3" 
                            placeholder="Tell us about any special requirements..."
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none placeholder:text-gray-500 text-gray-900 ${errors.message ? "border-red-300 bg-red-50" : "border-gray-200"}`} 
                          />
                          {errors.message && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.message}</div>}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Booking Request
                            </>
                          )}
                        </button>

                        <div className="mt-4 bg-gray-50 rounded-xl p-3 text-center">
                          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                            <Award className="w-4 h-4" /> Your information is secure
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomsSection;