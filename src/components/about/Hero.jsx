import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  X,
  Phone,
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Award,
  Home,
  Clock,
  Users as Staff,
  Tag,
  Sparkles,
  MapPin
} from "lucide-react";

const WelcomeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
    roomType: "Burra Bungalow",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef(null);

  const BASE_URLL = "https://burrabungalow.com";

  const pricingOptions = [
    {
      label: "Burra Bungalow",
      displayLabel: "Burra Bungalow - 3 Bedroom Villa",
      price: "₹23,000",
      note: "Incl. breakfast & taxes",
      hasOffer: false,
    },
    {
      label: "Annexe",
      displayLabel: "Annexe - 2 Bedroom Villa",
      price: "₹12,000",
      note: "Incl. breakfast & taxes",
      hasOffer: false,
      offerText: "Book 3 nights & get 20% off!",
    },
    {
      label: "Burra Bungalow + Annexe Combo",
      displayLabel: "Burra Bungalow + Annexe Combo",
      price: "₹30,000",
      note: "Incl. breakfast & taxes",
      hasOffer: false,
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "For Reservations",
      items: [{ text: "+91 9810891889", href: "tel:+919810891889" }],
    },
    {
      icon: Mail,
      title: "Email Inquiries",
      items: [
        { text: "mrinalinipahwa@gmail.com", href: "mailto:mrinalinipahwa@gmail.com" },
        { text: "rageshrir@gmail.com", href: "mailto:rageshrir@gmail.com" },
      ],
    },
    {
      icon: MapPin,
      title: "Our Location",
      items: [
        {
          text: (
            <>
              Burra Bungalow
              <br />
              Savitri Bhawan (Near wynberg Junior School)
              <br />
              Rajpur Road, Mussoorie
              <br />
              Uttarakhand 248197
            </>
          ),
          href: "#",
        },
      ],
    },
  ];

  useEffect(() => {
    const outside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) setIsModalOpen(false);
    };
    const esc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", outside);
      document.addEventListener("keydown", esc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

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

  const closeModal = () => setIsModalOpen(false);

  const handleRoomTypeSelection = (roomType) => {
    setFormData((prev) => ({ ...prev, roomType }));
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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await fetch(`${BASE_URLL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        closeModal();
      }, 3000);
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/burra bunglow (2).mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img
              src="/fallback-image.jpg"
              alt="Background fallback"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Optional overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-black/20"></div> */}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#c49d4f]">
            Welcome to Your Luxurious Home Away from Home
          </h2>

          {/* Content */}
          <div className="mt-8 space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed text-left">
            <p>
              Burra Bungalow is a historic boutique homestay Villa that has silently stored more than a century of memories, moods, and charm, offering serene mountain views and gentle sunrise views. It is tucked away in a private, peaceful setting among birdsongs and old stately deodars, yet remains easily accessible. Burra Bungalows, the British word for "big," were previously home to plantation managers in the enormous Assamese tea estates where our parents worked, and this is where the name originates. After our father retired from the tea gardens, our mother painstakingly and carefully rebuilt this house, which is a true work of love. The cottage has been subtly updated for comfort, yet its vintage charm is still very much there, now featuring a balcony with valley views, cozy bonfire & sit-out spaces, and thoughtfully curated interiors.
            </p>

            <p>
              Burra Bungalow offers private parking available for up to three cars, a 24×7 water supply from a spring, strong WiFi for remote work, and support from a caretaker with optional home-cooked meals, all within a calm, green landscape of rose bushes and trees, making it one of the top five homestays for a relaxed getaway. The house is single-level, fully carpeted, and comfortably accommodates up to six guests.
            </p>
          </div>

          {/* Book Now Button */}
          <div className="mt-10">
            <button
              onClick={() => openModal("Burra Bungalow")}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Your Stay
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div
            ref={modalRef}
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Modal header */}
            <div className="sticky top-0 bg-white z-10 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    <MessageSquare className="w-4 h-4" />
                    BOOK YOUR STAY — {formData.roomType.toUpperCase()}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                    Plan Your Perfect{" "}
                    <span className="text-[#caa355]">Getaway</span>
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your inquiry has been received. Our team will contact you
                    within 2 hours.
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Sidebar with Villa Selection */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                      <h3 className="text-base font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-amber-700" />
                        Select Your Villa
                      </h3>
                      <div className="space-y-3">
                        {pricingOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleRoomTypeSelection(opt.label)}
                            className={`w-full text-left p-3 rounded-xl border transition-all duration-300 ${
                              formData.roomType === opt.label
                                ? "bg-amber-100 border-amber-400 shadow-md scale-105"
                                : "bg-white border-amber-100 hover:bg-amber-50 hover:border-amber-300 hover:scale-[1.02]"
                            }`}
                          >
                            <p className="text-xs font-semibold text-gray-700">
                              {opt.displayLabel}
                            </p>
                            <p className="text-lg font-bold text-[#a08144]">
                              {opt.price}
                            </p>
                            <p className="text-xs text-emerald-700 flex items-center gap-1 mt-0.5">
                              <CheckCircle className="w-3 h-3" /> Per day ·{" "}
                              {opt.note}
                            </p>
                            {opt.hasOffer && (
                              <div className="mt-2 inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                <Sparkles className="w-3 h-3" />
                                {opt.offerText}
                              </div>
                            )}
                            {formData.roomType === opt.label && (
                              <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Selected
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5">
                      <h3 className="text-lg font-serif font-bold text-gray-900 mb-5">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        {contactInfo.map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-xl bg-white"
                            >
                              <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-emerald-600" />
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
                  <div className="lg:col-span-2 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Type *
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-gray-900"
                        >
                          <option value="Burra Bungalow">
                            Burra Bungalow — ₹23,000/day
                          </option>
                          <option value="Annexe">
                            Annexe — ₹12,000/day
                          </option>
                          <option value="Burra Bungalow + Annexe Combo">
                            Burra Bungalow + Annexe Combo — ₹30,000/day
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 text-gray-900 ${
                              errors.name
                                ? "border-red-300 bg-red-50"
                                : "border-gray-200"
                            }`}
                          />
                          {errors.name && (
                            <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 text-gray-900 ${
                              errors.email
                                ? "border-red-300 bg-red-50"
                                : "border-gray-200"
                            }`}
                          />
                          {errors.email && (
                            <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 text-gray-900 ${
                            errors.phone
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200"
                          }`}
                        />
                        {errors.phone && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-in Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-out Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            min={
                              formData.checkIn ||
                              new Date().toISOString().split("T")[0]
                            }
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guests
                        </label>
                        <div className="relative">
                          <Staff className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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

                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Check-in &amp; Check-out Timings
                          </p>
                          <p className="text-sm text-gray-600">
                            Check-in:{" "}
                            <span className="font-semibold">2:00 PM</span> |
                            Check-out:{" "}
                            <span className="font-semibold">12:00 PM (Noon)</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Early check-in and late check-out subject to
                            availability
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="3"
                          placeholder="Tell us about any special requirements..."
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none placeholder:text-gray-400 text-gray-900 ${
                            errors.message
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200"
                          }`}
                        />
                        {errors.message && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                          <Award className="w-4 h-4" /> Your information is
                          secure
                        </p>
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

export default WelcomeSection;