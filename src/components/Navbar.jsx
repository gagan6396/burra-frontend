import { useState } from "react";
import { X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const activeLink = location.pathname;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const handleLinkClick = (href) => {
    setIsOpen(false);
    // Navigate to the page
    navigate(href);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-all duration-300">
            <Link to="/" className="flex items-center space-x-3">
              {/* Fixed logo - added alt text and proper img tag */}
              <img src="/logo.png" alt="Burra Bungalow Logo" className="h-25 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-xl group ${
                  activeLink === link.href
                    ? "text-amber-700 bg-amber-50"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-amber-600 transition-all duration-300 rounded-full ${
                    activeLink === link.href ? "w-8" : "w-0 group-hover:w-8"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 rounded-xl transition-all duration-300 text-gray-700 hover:text-amber-700 hover:bg-amber-50"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`relative w-80 h-full bg-white shadow-2xl transform transition-all duration-500 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-amber-100">
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3"
              >
                {/* Fixed mobile logo */}
                <img src="/logo.png" alt="Burra Bungalow Logo" className="h-10 w-auto" />
                <div>
                  <h2 className="text-lg font-bold text-amber-900">
                    Burra Bungalow
                  </h2>
                  <p className="text-xs text-amber-700">Luxury Home Stay</p>
                </div>
              </Link>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-6 py-8 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`block px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-2 w-full text-left ${
                  activeLink === link.href
                    ? "bg-amber-100 text-amber-800"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                {link.name}
              </button>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4">
              <Link 
                to="/contact-us" 
                onClick={() => setIsOpen(false)}
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg text-center"
              >
                Book Your Stay
              </Link>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </nav>
  );
}