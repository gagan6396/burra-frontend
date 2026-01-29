import { useState } from "react";
import axios from "axios";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  Award,
  Home,
} from "lucide-react";

const BASE_URLL = "http://localhost:5001"

export default function ContactEnquiry() {
  console.log("YETEYEYEY",BASE_URLL)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
    roomType: "Burra Bungalow", // Added room type field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      await axios.post(
        `${BASE_URLL}/api/contact/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
        { text: "+91 9845155496", href: "tel:+919845155496" },
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
              Burra Bungalow<br /> Savitri Bhawan
              (Near wynberg Junior School) Rajpur Road<br />
              Mussoorie Uttarakhand 248197
            </>
          ),
          href: "#",
        },
      ],
    },
  ];

  /* ✅ SUCCESS STATE */
  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-emerald-100">
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
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
              <p className="text-emerald-800 font-medium">
                Booking Reference: #BH{Date.now().toString().slice(-6)}
              </p>
              <p className="text-emerald-700 text-sm mt-2">
                Room Type: {formData.roomType}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ✅ MAIN UI — UNCHANGED */
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-200">
            <MessageSquare className="w-4 h-4" />
            GET IN TOUCH
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Plan Your Perfect{" "}
            <span className="block text-[#caa355]">Getaway</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience luxury at Burra Bungalow? Contact our
            reservations team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* CONTACT INFO */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          {item.title}
                        </p>
                        <div className="space-y-1">
                          {item.items.map((sub, j) => (
                            <a
                              key={j}
                              href={sub.href}
                              className="block text-gray-600 text-sm hover:text-emerald-600 transition-colors"
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

              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.753109420587!2d78.0850603743707!3d30.357965803650256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d7d56548dbfd%3A0xe1982a289b663b72!2sDream%20Byte%20Solutions!5e0!3m2!1sen!2sin!4v1767006844998!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  title="Location Map"
                />
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                Make a Reservation
              </h3>

              {/* ⬇️ ALL YOUR INPUTS — UPDATED ⬇️ */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-900 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                      {errors.name && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.name}</div>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-900 ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                      {errors.email && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.email}</div>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210"
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-500 text-gray-900 ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                    {errors.phone && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.phone}</div>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-500 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} min={formData.checkIn || new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-500 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select name="guests" value={formData.guests} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-gray-900">
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about any special requirements..."
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none placeholder:text-gray-500 text-gray-900 ${errors.message ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                    {errors.message && <div className="flex items-center gap-1 mt-1 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{errors.message}</div>}
                  </div>
                </div>

               </div>
              {/* button */}
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

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" /> Your information is secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}