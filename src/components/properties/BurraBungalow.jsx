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
  Award,
  Cctv,
  Flame,
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

const BurraBungalow = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [thumbnailsToShow, setThumbnailsToShow] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", checkIn: "", checkOut: "",
    guests: "2", message: "", roomType: "Burra Bungalow",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef(null);

  useReveal();

  const images = [
    "/1.webp","/2.webp","/3.webp","/4.webp","/5.webp","/6.webp",
    "/7.webp","/8.webp","/9.webp","/10.webp","/11.webp","/12.webp",
  ];

  const features = [
    { icon: Bed,    text: "Three bedrooms" },
    { icon: Cctv,   text: "External Cameras" },
    { icon: Users,  text: "Accommodates up to 6 adults" },
    { icon: Bath,   text: "Three attached Bathroom" },
    { icon: Coffee, text: "Living room cum dinning area" },
  ];

  const propertyHighlights = [
    { icon: Car,      text: "Parking for 3 cars",           bg: "bg-blue-50",   iconColor: "text-blue-600",   ring: "ring-blue-100"   },
    { icon: Cctv,     text: "External Cameras on Property", bg: "bg-blue-50",   iconColor: "text-blue-600",   ring: "ring-blue-100"   },
    { icon: Droplets, text: "24×7 spring water",            bg: "bg-cyan-50",   iconColor: "text-cyan-600",   ring: "ring-cyan-100"   },
    { icon: Wifi,     text: "Good Wi-Fi connectivity",      bg: "bg-purple-50", iconColor: "text-purple-600", ring: "ring-purple-100" },
    { icon: Tv,       text: "Large TV in lobby",            bg: "bg-red-50",    iconColor: "text-red-600",    ring: "ring-red-100"    },
    { icon: CloudSun, text: "Spacious light-filled rooms",  bg: "bg-yellow-50", iconColor: "text-yellow-600", ring: "ring-yellow-100" },
    { icon: Wind,     text: "High wooden beamed ceiling",   bg: "bg-amber-50",  iconColor: "text-amber-600",  ring: "ring-amber-100"  },
  ];

  const bedrooms = [
    { name: "Blue Bedroom",     description: "Facing east, perfect for early risers who enjoy watching the sunrise from the comfort of their bed", icon: Sun,   bg: "bg-blue-50",    iconBg: "bg-blue-100",    iconColor: "text-blue-600",    border: "border-blue-100"    },
    { name: "Green Bedroom",    description: "Facing west, bathed in warm afternoon light—ideal for late risers",                                   icon: Moon,  bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", border: "border-emerald-100" },
    { name: "Forest View Room", description: "Smaller and wonderfully cosy, offers beautiful sunlit view of the forest",                           icon: Trees, bg: "bg-amber-50",   iconBg: "bg-amber-100",   iconColor: "text-amber-600",   border: "border-amber-100"   },
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
        { text: "rageshrir@gmail.com",        href: "mailto:rageshrir@gmail.com" },
      ],
    },
    {
      icon: MapPin, title: "Our Location",
      items: [
        {
          text: (<>Burra Bungalow<br />Savitri Bhawan (Near Wynberg Junior School)<br />Rajpur Road, Mussoorie<br />Uttarakhand 248197</>),
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
    setFormData({ name:"", email:"", phone:"", checkIn:"", checkOut:"", guests:"2", message:"", roomType:"Burra Bungalow" });
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
        setFormData({ name:"", email:"", phone:"", checkIn:"", checkOut:"", guests:"2", message:"", roomType:"Burra Bungalow" });
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
      <div className="h-px w-14 bg-green-300" />
      <div className="w-2 h-2 rotate-45 bg-green-400" />
      <div className="h-px w-14 bg-green-300" />
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
          {/* eyebrow line */}
          <div className="reveal flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-green-400" />
            <span className="text-xs font-semibold tracking-[.18em] uppercase text-green-600">
              Heritage Retreat · Mussoorie
            </span>
            <div className="h-px w-10 bg-green-400" />
          </div>

          <h2 className="reveal text-3xl font-bold text-green-900 mb-2 text-center">
            About Burra Bungalow
          </h2>
          <div className="reveal"><Ornament /></div>

          <div className="reveal grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our spacious private villa in Mussoorie is a boutique homestay offering the perfect blend of comfort, luxury, and peaceful surroundings, recognized among the top five homestays and ideal for a family stay in Mussoorie. This 3 bedroom villa in Mussoorie features elegant ensuite bedrooms with heated blankets and generous living spaces designed for relaxation.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Enjoy stunning sunrise views and serene mountain views from the eastern and western patios, perfect for quiet mornings and evenings. The property is private, easily accessible, and includes private parking, making it a seamless getaway. Whether you're looking for a Mussoorie homestay or a cozy cottage with view, this villa offers a warm and memorable retreat.
              </p>
            </div>

            <div className="bg-green-50 border border-amber-100 shadow-sm p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                      <feature.icon className="w-4 h-4 text-amber-700" />
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            GALLERY — Redesigned: Content Left, Image Right
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="reveal grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Camera className="w-4 h-4" />
                PHOTO GALLERY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                A Visual Journey<br />
                <span className="text-green-600">Through Burra Bungalow</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
              Enjoy stunning sunrise views and serene mountain views from the eastern and western patios, perfect for quiet mornings and evenings. The property is private, easily accessible, and includes private parking, making it a seamless getaway. Whether you're looking for a Mussoorie homestay or a cozy cottage with view, this villa offers a warm and memorable retreat.
                 <br/>
                 Explore the beauty and charm of our heritage property through these captivating images. 
                From sun-drenched rooms to serene patios with mountain views, every corner tells a story 
                of comfort and elegance.
              </p>
              {/* <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">12+</div>
                  <div className="text-xs text-gray-500">Photo Collection</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-xs text-gray-500">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">360°</div>
                  <div className="text-xs text-gray-500">Mountain Views</div>
                </div>
              </div> */}
            </div>

            {/* Right Side - Image Gallery */}
            <div className="space-y-3">
              {/* Main image */}
              <div className="img-zoom relative h-[350px] md:h-[450px] overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={images[selectedImageIndex]}
                  alt={`Burra Bungalow - Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {/* counter */}
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
                      : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50 hover:scale-110"
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
                            ? "ring-2 ring-amber-500 ring-offset-1 scale-105 shadow-md"
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
                      : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50 hover:scale-110"
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PROPERTY HIGHLIGHTS
        ══════════════════════════════════ */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="reveal text-3xl font-bold text-green-900 mb-2 text-center">
              Property Highlights
            </h2>
            <div className="reveal"><Ornament /></div>
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {propertyHighlights.map((feature, i) => (
                <div
                  key={i}
                  className={`card-lift flex items-center gap-4 p-4 ${feature.bg} rounded-2xl ring-1 ${feature.ring}`}
                >
                  <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            BEDROOMS
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="reveal text-3xl font-bold text-green-900 mb-2 text-center">Bedrooms</h2>
          <div className="reveal"><Ornament /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            CULINARY EXPERIENCE
        ══════════════════════════════════ */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="img-zoom relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl">
                <img src="/dinning.webp" alt="Dining Experience" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
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
                    Step into a boutique homestay where you can enjoy private, peaceful dining with simple, authentic food made with care. Surrounded by beautiful mountain views and sunrise views, you can relax with home-cooked meals and a cozy bonfire & sit-out, making every meal a warm and memorable experience.
                  </p>
                </div>
                <div className="space-y-4">
                  {["Wholesome home cooked meals", "Balcony with valley views", "Caretaker / home-cooked meals"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-amber-600 rounded-full" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            BONFIRE
        ══════════════════════════════════ */}
        {/* <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="img-zoom relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl order-1 lg:order-2">
              <img src="/bonfire.webp" alt="Bonfire Sitout Area" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <Flame className="w-4 h-4" />
                  OUTDOOR SITOUT
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  The Bonfire Experience
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  As the mountain air cools and the last light fades behind the ridgeline, our open-air bonfire sitout comes alive. Gather around a crackling bonfire with steaming chai and hot pakodas close at hand the kind of evening that stays with you long after you leave the mountains.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Bonfire & sit-out",
                  "Comfortable seating with cushioned chairs",
                  "Caretaker / home-cooked meals",
                  "Stunning open-sky stargazing away from city lights",
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
        </section> */}

        {/* ══════════════════════════════════
            KITCHEN & AMENITIES
        ══════════════════════════════════ */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="reveal text-3xl font-bold text-amber-900 mb-2 text-center">
              Kitchen & Amenities
            </h2>
            <div className="reveal"><Ornament /></div>

            {/* Kitchen banner */}
            <div className="reveal bg-gradient-to-br from-amber-50 to-white p-6 md:p-8 rounded-2xl border border-amber-200 mb-8 flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <Utensils className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Spacious Kitchen</h4>
                <p className="text-gray-700">
                  Fully equipped with refrigerator, gas stove, microwave, oven, washing machine, and iron.
                </p>
              </div>
            </div>

            {/* Additional + Daily */}
            <div className="reveal grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-200">
                <h4 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Additional Facilities
                </h4>
                <ul className="space-y-4">
                  {[
                    { icon: Home,     text: "Separate driver/nanny room with attached bathroom (additional charge)" },
                    { icon: Trees,    text: "Large patios on either side of the bungalow" },
                    { icon: Sparkles, text: "Wood and coal-fired sigri for evening gatherings" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-200">
                <h4 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-700" />
                  Daily Experience
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" /> Typical Day:
                    </h5>
                    <ul className="space-y-2">
                      {[
                        "Explore the hill station during the day",
                        "Return to hot pakodas and tea in late afternoon",
                        "Evening sigri with steaming hot momos served by our cook",
                        "Dinner at home while unwinding",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-amber-100">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2 text-sm">
                      <Staff className="w-4 h-4" /> Staff Services:
                    </h5>
                    <ul className="space-y-2">
                      {[
                        "Two full-time house staff live on the property",
                        "Take care of cooking, cleaning, and daily needs",
                        "Allow you to truly relax and create cherished memories",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PERFECT FOR
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="reveal text-3xl font-bold text-amber-900 mb-2">Perfect For</h2>
          <div className="reveal"><Ornament /></div>
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Couples seeking privacy", emoji: "🌿" },
              { label: "Families reconnecting",   emoji: "🏔️" },
              { label: "Friend getaways",          emoji: "🌟" },
            ].map((item, i) => (
              <div
                key={i}
                className="card-lift bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border border-amber-200"
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
        {/* <section className="relative py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 overflow-hidden">
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
              <div className="h-px w-10 bg-amber-300" />
              <span className="text-xs font-semibold tracking-[.18em] uppercase text-amber-300">
                Book Your Stay
              </span>
              <div className="h-px w-10 bg-amber-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-amber-200 mb-8 leading-relaxed">
              Book your stay at Burra Bungalow today and create unforgettable memories in the hills.
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
              {/* Modal header */}
              <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-5 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                      <MessageSquare className="w-4 h-4" />
                      BOOK YOUR STAY — BURRA BUNGALOW
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
                    {/* Contact sidebar */}
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

                    {/* Form */}
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

export default BurraBungalow;