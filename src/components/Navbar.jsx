import { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const activeLink = location.pathname;

  const propertyOptions = [
    { name: "Burra Bungalow", href: "/burra-bungalow" },
    { name: "Annexe", href: "/annexe" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { 
      name: "Properties", 
      href: null,
      isDropdown: true,
      dropdownItems: propertyOptions
    },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Places Nearby", href: "/places-nearby" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = (href) => {
    setIsOpen(false);
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTestimonialsAndOpenForm = () => {
    console.log("Attempting to scroll to review form...");
    
    // Close mobile menu if open
    setIsOpen(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and DOM to update before scrolling
      setTimeout(() => {
        scrollAndOpenForm();
      }, 500);
    } else {
      scrollAndOpenForm();
    }
  };

  const scrollToTestimonials = () => {
    console.log("Attempting to scroll to guest reviews...");
    
    // Close mobile menu if open
    setIsOpen(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and DOM to update before scrolling
      setTimeout(() => {
        scrollToReviews();
      }, 500);
    } else {
      scrollToReviews();
    }
  };

  const scrollToReviews = () => {
    const testimonialSection = document.getElementById('testimonial');
    if (testimonialSection) {
      const offset = 80; // Height of navbar
      const elementPosition = testimonialSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      console.log("Scrolled to guest reviews section");
    } else {
      console.log("Guest reviews section not found");
    }
  };

  const scrollAndOpenForm = () => {
    // Dispatch custom event to open the form
    window.dispatchEvent(new CustomEvent('openReviewForm'));
    console.log("Dispatched openReviewForm event");
  };

  const handleDropdownEnter = () => {
    // Clear any pending timeout that would close the dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    // Set a timeout to close the dropdown, giving user time to move to the dropdown menu
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay before closing
  };

  const handlePropertyClick = (href) => {
    setIsDropdownOpen(false);
    setIsOpen(false);
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-all duration-300">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Burra Bungalow Logo" className="h-25 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div 
                    key={link.name}
                    ref={dropdownRef}
                    className="relative "
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`relative px-6 py-3 text-sm cursor-pointer font-semibold tracking-wide transition-all duration-300 rounded-xl group flex items-center gap-2 ${
                        link.dropdownItems.some(option => activeLink === option.href)
                          ? "text-amber-700 bg-amber-50"
                          : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                      }`}
                    >
                      {link.name}
                      <ChevronDown 
                        className={`w-4 h-4 cursor-pointer transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`} 
                      />
                      <span
                        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-amber-600 transition-all duration-300 rounded-full ${
                          link.dropdownItems.some(option => activeLink === option.href) ? "w-8" : "w-0 group-hover:w-8"
                        }`}
                      />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden z-50">
                        {link.dropdownItems.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => handlePropertyClick(option.href)}
                            className={`block w-full text-left px-6 py-3 text-sm font-medium transition-all duration-200 ${
                              activeLink === option.href
                                ? "bg-amber-50 text-amber-700"
                                : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                            }`}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
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
              );
            })}
            
            {/* Desktop Guest Reviews Button */}
            <button
              onClick={scrollToTestimonials}
              className="ml-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold tracking-wide rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Guest Reviews
            </button>

            {/* Desktop Add a Review Button */}
            <button
              onClick={scrollToTestimonialsAndOpenForm}
              className="ml-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold tracking-wide rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Add a Review
            </button>
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
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.name} className="space-y-2">
                    <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {link.name}
                    </div>
                    {link.dropdownItems.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => handlePropertyClick(option.href)}
                        className={`block px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-2 w-full text-left ml-4 ${
                          activeLink === option.href
                            ? "bg-amber-100 text-amber-800"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                );
              }
              
              return (
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
              );
            })}

            {/* Mobile Guest Reviews Button */}
            <div className="pt-2">
              <button
                onClick={scrollToTestimonials}
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg text-center"
              >
                Guest Reviews
              </button>
            </div>

            {/* Mobile Add a Review Button */}
            <div className="pt-2">
              <button
                onClick={scrollToTestimonialsAndOpenForm}
                className="block w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg text-center"
              >
                Add a Review
              </button>
            </div>

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