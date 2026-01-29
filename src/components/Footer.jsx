import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/burra_bungalow/",
      color: "hover:text-pink-500",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      items: [
        { text: "+91 9810301645", href: "tel:+919810301645" },
        { text: "+91 9845155496", href: "tel:+919845155496" },
      ],
    },
    {
      icon: Mail,
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
      items: [
        {
          text: "Savitri Bhawan (Near Wynberg Junior School) Rajpur Road Mussoorie Uttarakhand 248179",
          href: "#",
        },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/logo.png"
                className="object-contain h-24 w-auto"
                alt="Burra Bungalow Logo"
              />
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Burra Bungalow
                </h3>
                <p className="text-emerald-300 text-sm">Luxury Home Stay</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Burra Bungalow is a charming colonial-style retreat offering peace,
              comfort, and scenic views. Just a short walk or drive from the
              Mall, it features spacious, sunlit interiors, a fully equipped
              kitchen, Wi-Fi, TV, and private parking for up to three cars making
              it an ideal place to relax, unwind, and reconnect.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                // Use <a> for external links
                if (social.href.startsWith("http")) {
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                }
                // Use <Link> for internal routes
                return (
                  <Link
                    key={social.name}
                    to={social.href}
                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Contact Info
            </h4>

            <ul className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index} className="flex items-start">
                    <div className="w-5 h-5 mt-1 mr-3 flex-shrink-0">
                      <Icon className="w-5 h-5 text-gray-300" />
                    </div>

                    <div className="space-y-1">
                      {contact.items.map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          className="block text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm leading-relaxed"
                        >
                          {item.text}
                        </a>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="text-sm font-semibold text-white mb-3">
                Stay Updated
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-300"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-lg transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Burra Bungalow. All rights reserved. Developed with
              passion by Dream Byte Solutions
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}