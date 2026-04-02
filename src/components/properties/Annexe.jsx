import { useState, useEffect, useRef } from "react";
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
  Award,
  Cctv,
  Flame,
  BookOpen,
  Mountain,
  Star,
  Camera
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

/* ── Scroll-reveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Annexe = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [thumbnailsToShow, setThumbnailsToShow] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", checkIn: "", checkOut: "",
    guests: "2", message: "", roomType: "Annexe",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef(null);

  useReveal();

  const images = [
    "/20.webp","/21.webp","/22.webp","library.webp","/23.webp",
    "/24.webp","/25.webp","/26.webp","/27.webp","/28.webp",
    "/29.webp","/30.webp","/31.webp",
  ];

  const features = [
    { icon: Bed,    text: "Two bedrooms" },
    { icon: Cctv,   text: "External Cameras" },
    { icon: Users,  text: "Perfect for families" },
    { icon: Bath,   text: "Attached bathroom" },
    { icon: Utensils, text: "Sitting cum dining area" },
  ];

  const highlights = [
    { icon: Trees,    title: "Forest Views", description: "Panoramic forest views from private gallery" },
    { icon: Home,     title: "Pinewood Interiors", description: "Elegant handcrafted pinewood construction" },
    { icon: Sparkles, title: "Heated Bedrooms", description: "Heated blankets for cozy mountain nights" },
    { icon: Mountain, title: "Serene Location", description: "Peaceful setting surrounded by nature" },
  ];

  const amenities = [
    { icon: Wifi, text: "High-speed Wi-Fi", bg: "bg-purple-50", iconColor: "text-purple-600", ring: "ring-purple-100" },
    { icon: Tv, text: "Smart TV", bg: "bg-red-50", iconColor: "text-red-600", ring: "ring-red-100" },
    { icon: Car, text: "Private Parking", bg: "bg-blue-50", iconColor: "text-blue-600", ring: "ring-blue-100" },
    { icon: Droplets, text: "24/7 Spring Water", bg: "bg-cyan-50", iconColor: "text-cyan-600", ring: "ring-cyan-100" },
    { icon: Sun, text: "Forest Views", bg: "bg-yellow-50", iconColor: "text-yellow-600", ring: "ring-yellow-100" },
    { icon: Wind, text: "Private Gallery", bg: "bg-green-50", iconColor: "text-green-600", ring: "ring-green-100" },
  ];

  const bedrooms = [
    { name: "Master Bedroom", description: "Spacious master bedroom with king-size bed, heated blankets, and attached bathroom.", icon: Bed, features: "Forest views, Private gallery access, Wardrobe", bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", border: "border-emerald-100" },
    { name: "Guest Bedroom", description: "Cozy guest bedroom with queen-size bed, heated blankets, and attached bathroom.", icon: Bed, features: "Garden views, Reading nook, Comfortable seating", bg: "bg-amber-50", iconBg: "bg-amber-100", iconColor: "text-amber-600", border: "border-amber-100" },
  ];

  const contactInfo = [
    {
      icon: Phone, title: "For Reservations",
      items: [
        { text: "+91 9810301645", href: "tel:+919810301645" },
        { text: "+91 9845155496", href: "tel:+919845155496" },
      ],
    },
    {
      icon: Mail, title: "Email Inquiries",
      items: [
        { text: "mrinalinipahawa@gmail.com", href: "mailto:mrinalinipahawa@gmail.com" },
        { text: "rageshrir@gmail.com", href: "mailto:rageshrir@gmail.com" },
      ],
    },
    {
      icon: MapPin, title: "Our Location",
      items: [
        {
          text: (<>Annexe - Burra Bungalow<br />Savitri Bhawan (Near Wynberg Junior School)<br />Rajpur Road, Mussoorie<br />Uttarakhand 248197</>),
          href: "#",
        },
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const update = () =>
      setThumbnailsToShow(window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 4 : 5);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const outside = (e) => { if (modalRef.current && !modalRef.current.contains(e.target)) setIsModalOpen(false); };
    const esc     = (e) => { if (e.key === "Escape") setIsModalOpen(false); };
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

  const openModal = () => {
    setIsModalOpen(true); setIsSubmitted(false);
    setFormData({ name:"", email:"", phone:"", checkIn:"", checkOut:"", guests:"2", message:"", roomType:"Annexe" });
    setErrors({});
  };
  const closeModal = () => setIsModalOpen(false);

  const validateForm = () => {
    const e = {};
    if (!formData.name.trim())  e.name  = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Email is invalid";
    if (!formData.phone.trim())   e.phone   = "Phone number is required";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await fetch("https://burrabungalow.com/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name:"", email:"", phone:"", checkIn:"", checkOut:"", guests:"2", message:"", roomType:"Annexe" });
        closeModal();
      }, 3000);
    } catch {
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Decorative section divider ── */
  const Ornament = () => (
    <div className="flex items-center justify-center gap-3 mb-10">
      <div className="h-px w-14 bg-emerald-300" />
      <div className="w-2 h-2 rotate-45 bg-emerald-400" />
      <div className="h-px w-14 bg-emerald-300" />
    </div>
  );

  return (
    <>
      <style>{`
        .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
        .revealed{opacity:1;transform:none}
        .reveal.d1{transition-delay:.1s}.reveal.d2{transition-delay:.2s}.reveal.d3{transition-delay:.3s}
        .img-zoom img{transition:transform .8s cubic-bezier(.22,1,.36,1)}
        .img-zoom:hover img{transform:scale(1.05)}
        .card-lift{transition:transform .25s,box-shadow .25s}
        .card-lift:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.09)}
        @keyframes modalIn{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:none}}
        .modal-enter{animation:modalIn .35s cubic-bezier(.22,1,.36,1) forwards}
      `}</style>

      <div className="pt-20 bg-stone-50 min-h-screen">
        <Navbar />

        {/* ══════════════════════════════════
            ABOUT — top of page
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 pt-14 pb-8">
          <div className="reveal flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-emerald-400" />
            <span className="text-xs font-semibold tracking-[.18em] uppercase text-emerald-600">
              Modern Comfort · Pinewood Retreat
            </span>
            <div className="h-px w-10 bg-emerald-400" />
          </div>

          <h2 className="reveal text-3xl font-bold text-emerald-900 mb-2 text-center">
            About Annexe
          </h2>
          <div className="reveal"><Ornament /></div>

          <div className="reveal grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Experience authentic luxury in our handcrafted annexe, thoughtfully designed to blend natural charm with refined comfort. The annexe features two beautifully crafted bedrooms with heated blankets, ensuring a warm and cozy stay even during cooler mountain nights.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Step out onto the private gallery to take in panoramic forest views, where the sights and sounds of nature create a deeply calming atmosphere. Inside, elegant pinewood interiors, warm textures, and carefully curated details enhance the sense of quiet sophistication.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 shadow-sm p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                      <feature.icon className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            GALLERY — Image Left, Content Right
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="reveal grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image Gallery */}
            <div className="space-y-3 order-1">
              {/* Main image */}
              <div className="img-zoom relative h-[350px] md:h-[450px] overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={images[selectedImageIndex]}
                  alt={`Annexe - Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold tracking-widest px-3 py-1 rounded-full">
                  {String(selectedImageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </div>
                <button
                  onClick={() => setSelectedImageIndex((p) => (p === 0 ? images.length - 1 : p - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 backdrop-blur-md hover:bg-white/35 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((p) => (p === images.length - 1 ? 0 : p + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 backdrop-blur-md hover:bg-white/35 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={() => setThumbnailStartIndex((p) => Math.max(0, p - 1))}
                  disabled={thumbnailStartIndex === 0}
                  className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    thumbnailStartIndex === 0
                      ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                      : "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:scale-110"
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-1.5 flex-1 justify-center overflow-hidden">
                  {images.slice(thumbnailStartIndex, thumbnailStartIndex + thumbnailsToShow).map((image, idx) => {
                    const ai = thumbnailStartIndex + idx;
                    return (
                      <button
                        key={ai}
                        onClick={() => setSelectedImageIndex(ai)}
                        className={`relative flex-1 min-w-0 aspect-[4/3] max-w-[70px] sm:max-w-[80px] rounded-lg overflow-hidden transition-all duration-300 ${
                          selectedImageIndex === ai
                            ? "ring-2 ring-emerald-500 ring-offset-1 scale-105 shadow-md"
                            : "opacity-60 hover:opacity-95 hover:scale-105"
                        }`}
                      >
                        <img src={image} alt={`Thumbnail ${ai + 1}`} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setThumbnailStartIndex((p) => Math.min(images.length - thumbnailsToShow, p + 1))}
                  disabled={thumbnailStartIndex >= images.length - thumbnailsToShow}
                  className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    thumbnailStartIndex >= images.length - thumbnailsToShow
                      ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                      : "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:scale-110"
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6 order-2">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Camera className="w-4 h-4" />
                PHOTO GALLERY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                A Visual Journey<br />
                <span className="text-emerald-600">Through Annexe</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Experience authentic luxury in our handcrafted annexe, thoughtfully designed to blend natural charm with refined comfort. The annexe features two beautifully crafted bedrooms with heated blankets, ensuring a warm and cozy stay even during cooler mountain nights.
                <br /><br />
                Step out onto the private gallery to take in panoramic forest views, where the sights and sounds of nature create a deeply calming atmosphere. Inside, elegant pinewood interiors, warm textures, and carefully curated details enhance the sense of quiet sophistication.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            HIGHLIGHTS
        ══════════════════════════════════ */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="reveal text-3xl font-bold text-emerald-900 mb-2 text-center">Highlights</h2>
            <div className="reveal"><Ornament /></div>
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, i) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={i}
                    className="card-lift bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-200 text-center hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-emerald-700" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{highlight.title}</h4>
                    <p className="text-sm text-gray-600">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            AMENITIES
        ══════════════════════════════════ */}
        <section className="bg-stone-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="reveal text-3xl font-bold text-emerald-900 mb-2 text-center">Amenities</h2>
            <div className="reveal"><Ornament /></div>
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((amenity, i) => (
                <div
                  key={i}
                  className={`card-lift flex items-center gap-4 p-4 ${amenity.bg} rounded-2xl ring-1 ${amenity.ring}`}
                >
                  <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                    <amenity.icon className={`w-5 h-5 ${amenity.iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{amenity.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            BEDROOMS
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="reveal text-3xl font-bold text-emerald-900 mb-2 text-center">Bedrooms</h2>
          <div className="reveal"><Ornament /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bedrooms.map((bedroom, i) => {
              const Icon = bedroom.icon;
              return (
                <div
                  key={i}
                  className={`reveal d${i + 1} card-lift flex flex-col gap-4 p-6 ${bedroom.bg} rounded-2xl border ${bedroom.border}`}
                >
                  <div className={`w-12 h-12 ${bedroom.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${bedroom.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{bedroom.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{bedroom.description}</p>
                    <div className="mt-3 text-xs text-gray-500">
                      <span className="font-medium">Features:</span> {bedroom.features}
                    </div>
                  </div>
                  {/* <div className="mt-auto pt-3 border-t border-white/70 text-xs text-gray-500 flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5" />
                    Attached bathroom
                  </div> */}
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════
            LIVING AREA
        ══════════════════════════════════ */}
       

        {/* ══════════════════════════════════
            BONFIRE
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="img-zoom relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl order-1 lg:order-2">
              <img src="/bonfire.webp" alt="Bonfire Experience" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <Flame className="w-4 h-4" />
                  OUTDOOR EXPERIENCE
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  Cozy Evenings by the Bonfire
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Gather around the crackling bonfire with steaming chai and hot pakodas. The perfect way to end your day in the mountains, surrounded by nature and warm company.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Private bonfire sitout area",
                  "Evening snacks and refreshments",
                  "Stunning stargazing opportunities",
                  "Perfect for group gatherings"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            SERVICES
        ══════════════════════════════════ */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="reveal text-3xl font-bold text-emerald-900 mb-2 text-center">Services</h2>
            <div className="reveal"><Ornament /></div>
            <div className="reveal grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <Staff className="w-6 h-6 text-emerald-700" />
                  <h4 className="text-lg font-semibold text-gray-900">Staff Services</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    "Dedicated caretaker on property",
                    "Daily housekeeping service",
                    "Home-cooked meals available",
                    "24/7 assistance"
                  ].map((service, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2" />
                      <span className="text-sm text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-amber-700" />
                  <h4 className="text-lg font-semibold text-gray-900">Daily Experience</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    "Morning tea with forest views",
                    "Explore local attractions",
                    "Evening snacks by the bonfire",
                    "Relaxed dinners at the property"
                  ].map((experience, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2" />
                      <span className="text-sm text-gray-700">{experience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PERFECT FOR
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="reveal text-3xl font-bold text-emerald-900 mb-2">Perfect For</h2>
          <div className="reveal"><Ornament /></div>
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Couples seeking romance", emoji: "🌿" },
              { label: "Small families", emoji: "🏔️" },
              { label: "Friends' getaways", emoji: "🌟" },
            ].map((item, i) => (
              <div
                key={i}
                className="card-lift bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl border border-emerald-200"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            BOOKING CTA (Commented out as requested)
        ══════════════════════════════════ */}
        {/* <section className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative reveal text-center max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-emerald-300" />
              <span className="text-xs font-semibold tracking-[.18em] uppercase text-emerald-300">
                Book Your Stay
              </span>
              <div className="h-px w-10 bg-emerald-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Book Your Stay at Annexe
            </h2>
            <p className="text-emerald-200 mb-8 leading-relaxed">
              Experience modern comfort and convenience at our beautiful annexe.
            </p>
            <button
              onClick={openModal}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-emerald-900/40 inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </button>
          </div>
        </section> */}

        {/* ══════════════════════════════════
            MODAL
        ══════════════════════════════════ */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
            <div
              ref={modalRef}
              className="modal-enter relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-5 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                      <MessageSquare className="w-4 h-4" />
                      BOOK YOUR STAY — ANNEXE
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">
                      Plan Your Perfect <span className="text-[#caa355]">Getaway</span>
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shrink-0 mt-1"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-14">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Thank You!</h2>
                    <p className="text-gray-600 mb-6">
                      Your inquiry has been received successfully. Our team will contact you within 2 hours.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="bg-stone-50 rounded-2xl p-6 h-full">
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                          Contact Information
                        </h3>
                        <div className="space-y-3">
                          {contactInfo.map((item, i) => {
                            const Icon = item.icon;
                            return (
                              <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100"
                              >
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm mb-1">{item.title}</p>
                                  <div className="space-y-0.5">
                                    {item.items.map((sub, j) => (
                                      <a
                                        key={j}
                                        href={sub.href}
                                        className="block text-gray-600 text-xs hover:text-emerald-600 transition-colors leading-relaxed"
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

                    <div className="lg:col-span-2 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text" name="name" value={formData.name}
                              onChange={handleChange} placeholder="Enter your full name"
                              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-emerald-400"}`}
                            />
                            {errors.name && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.name}</div>}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email" name="email" value={formData.email}
                              onChange={handleChange} placeholder="Enter your email"
                              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-emerald-400"}`}
                            />
                            {errors.email && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.email}</div>}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel" name="phone" value={formData.phone}
                            onChange={handleChange} placeholder="+91 98765 43210"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-emerald-400"}`}
                          />
                          {errors.phone && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.phone}</div>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date" name="checkIn" value={formData.checkIn} onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 text-gray-900"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date" name="checkOut" value={formData.checkOut} onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 text-gray-900"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests *</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea
                            name="message" value={formData.message} onChange={handleChange}
                            rows={4} placeholder="Tell us about any special requirements..."
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-gray-900 ${errors.message ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-emerald-400"}`}
                          />
                          {errors.message && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.message}</div>}
                        </div>
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Annexe;