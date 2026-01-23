import React, { useEffect, useRef, useState } from "react";
import { 
  MapPin, 
  Clock, 
  Plane, 
  X,
  Phone,
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  Award,
  Home // Added Home icon for room type
} from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMainVideoLoaded, setIsMainVideoLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
    roomType: "Burra Bungalow", // Added roomType field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const mainVideoRef = useRef(null);
  const modalRef = useRef(null);

  const BASE_URLL = "http://localhost:5001";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          videoRef.current?.play().catch(() => {});
          mainVideoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
          mainVideoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    sectionRef.current && observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
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

  const openModal = () => {
    setIsModalOpen(true);
    // Reset form state when opening modal
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "2",
      message: "",
      roomType: "Burra Bungalow", // Reset room type
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
          roomType: "Burra Bungalow", // Reset room type
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
      <section ref={sectionRef} className="relative w-full py-20 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isMainVideoLoaded ? "opacity-60" : "opacity-0"
            }`}
            onLoadedData={() => setIsMainVideoLoaded(true)}
          >
            <source src="/burra bunglow.mp4" type="video/mp4" />
          </video>

          {!isMainVideoLoaded && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/fallback-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
        </div>

        {/* Vine on the VERY left edge - covers entire section height */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="/vine.png" 
            alt=""
            className="absolute left-[-100px] top-0 w-40 md:w-50 lg:w-72 h-full opacity-70 pointer-events-none animate-property-vine-left"
            style={{ 
              transform: 'scaleY(-1) rotate(5deg)',
              animationDelay: '0.2s',
              animationFillMode: 'both',
              filter: 'drop-shadow(4px 8px 12px rgba(0,0,0,0.4))',
              objectFit: 'cover',
              objectPosition: 'left center'
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <span className="inline-block bg-[#ebca87] text-emerald-800 px-4 py-2 rounded-full font-semibold">
                Where Stay Becomes a Memory
              </span>

              <div className="relative inline-block">
                <h1 className="text-6xl lg:text-7xl font-serif font-bold text-[#caa355]">
                  Burra Bungalow
                </h1>
                <img
                  src="/fl.png"
                  alt=""
                  className="absolute top-0 right-0 w-14 h-14 animate-rotate-slow"
                />
              </div>

              <p className="text-xl text-emerald-700">
                Where nature meets elegance
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Nestled amidst ancient trees and birdsongs, Burra Bungalow is a
                lovingly restored heritage home offering peace, warmth, and timeless charm.
              </p>

              <button
                onClick={openModal}
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Book Your Stay
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/entt.png"
                  alt="Burra Bungalow"
                  className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Stats */}
        <div className="relative z-10 mt-32 px-6">
          <div
            className="max-w-7xl mx-auto p-12 rounded-3xl shadow-xl"
            style={{
              backgroundImage: "url('/board.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="text-3xl font-serif font-bold text-center text-[#b18b41] mb-12">
              Perfectly Located
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <Stat icon={<MapPin />} value="270 km" label="By Road" desc="5.5 hrs from Delhi" />
              <Stat icon={<Clock />} value="45 mins" label="Railway" desc="From Mussoorie" />
              <Stat icon={<Plane />} value="75 mins" label="Airport" desc="From Jollygrant" />
            </div>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes rotate-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-rotate-slow {
            animation: rotate-slow 25s linear infinite;
          }
          @keyframes property-vine-left {
            0% {
              transform: scaleY(-1) rotate(5deg) translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: scaleY(-1) rotate(5deg) translateX(0);
              opacity: 0.7;
            }
          }
          .animate-property-vine-left {
            animation: property-vine-left 1.5s ease-out forwards;
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
                    BOOK YOUR STAY
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
                // Success message with room type
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
                      {/* Room Type Dropdown - ADDED */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Room Type *</label>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select 
                            name="roomType" 
                            value={formData.roomType} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
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
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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

const Stat = ({ icon, value, label, desc }) => (
  <div className="p-6 rounded-2xl bg-white shadow-md">
    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-emerald-100 rounded-xl text-emerald-600">
      {icon}
    </div>
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-emerald-600 font-semibold">{label}</div>
    <div className="text-gray-600 text-sm">{desc}</div>
  </div>
);

export default HeroSection;