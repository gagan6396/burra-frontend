import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, Quote, ChevronLeft, ChevronRight, X } from "lucide-react";

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    content: ""
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  
  const formRef = useRef(null);

  const API_BASE_URL = 'https://burrabungalow.com/api';

  useEffect(() => {
    fetchTestimonials();
    console.log("TestimonialsCarousel mounted");
    
    const handleOpenReviewForm = () => {
      console.log("Received openReviewForm event, opening form...");
      setShowForm(true);
      
      setTimeout(() => {
        if (formRef.current) {
          const offset = 80;
          const elementPosition = formRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    };
    
    window.addEventListener('openReviewForm', handleOpenReviewForm);
    
    return () => {
      window.removeEventListener('openReviewForm', handleOpenReviewForm);
    };
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      const data = await response.json();
      
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    // Validate form
    if (!formData.name || !formData.content) {
      setSubmitMessage({ 
        type: "error", 
        text: "Please fill in all required fields (Name and Review)" 
      });
      setIsSubmitting(false);
      return;
    }

    // Validate email format only if provided
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitMessage({ 
          type: "error", 
          text: "Please enter a valid email address" 
        });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitMessage({ 
        type: "success", 
        text: "Thank you for your review! It has been added successfully." 
      });

      setFormData({
        name: "",
        email: "",
        rating: 5,
        content: ""
      });

      await fetchTestimonials();

      setTimeout(() => {
        setShowForm(false);
        setSubmitMessage({ type: "", text: "" });
      }, 2000);

    } catch (error) {
      setSubmitMessage({ 
        type: "error", 
        text: error.message || "Something went wrong. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section 
      id="testimonial"
      className="w-full bg-gradient-to-br from-amber-50 via-white to-stone-50 py-16 px-4 md:px-8"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4">
            Guest Reviews
          </h2>
          <p className="text-sm md:text-base text-amber-700 max-w-xl mx-auto">
            Discover why our guests keep coming back to experience luxury and
            comfort
          </p>
        </div>

        {/* Carousel Container */}
        {testimonials.length > 0 ? (
          <div className="relative mb-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
              className="pb-6 md:pb-10 [&_.swiper-pagination]:hidden md:[&_.swiper-pagination]:block"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id || testimonial.id}>
                  <div className="bg-gradient-to-br from-amber-50 to-stone-50 p-8 rounded-xl border border-amber-100">
                    <Quote className="w-10 h-10 text-amber-400 mb-4" />

                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "fill-emerald-500 text-emerald-500"
                              : "fill-gray-200 text-gray-200"
                          } mr-1`}
                        />
                      ))}
                    </div>

                    <p className="text-base text-gray-800 mb-8 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-4 border-2 border-amber-200 shadow-sm">
                        <span className="text-white font-semibold text-lg">
                          {getInitials(testimonial.name)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(testimonial.createdAt || testimonial.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-emerald-200 hover:bg-emerald-50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-emerald-600" />
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-emerald-200 hover:bg-emerald-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-emerald-600" />
            </button>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-amber-100 mb-8">
            <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* Review Count and Stats */}
        {testimonials.length > 0 && (
          <div className="text-center mb-8">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{testimonials.length}</span> {testimonials.length === 1 ? 'review' : 'reviews'} • 
              Average Rating: <span className="font-semibold">{(testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)}</span>/5
            </div>
          </div>
        )}

        {/* Write a Review Button */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {/* Review Submission Form */}
        {showForm && (
          <div 
            id="review-form"
            ref={formRef}
            className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8 border border-amber-100 relative scroll-mt-20"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-semibold text-amber-900 mb-6">Share Your Experience</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-black"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-black"
                  placeholder="your.email@example.com (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                          star <= (hoverRating || formData.rating)
                            ? "fill-emerald-500 text-emerald-500"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating} out of 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-black"
                  placeholder="Share your experience..."
                  required
                />
              </div>

              {submitMessage.text && (
                <div className={`p-3 rounded-lg ${
                  submitMessage.type === "success" 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}>
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;