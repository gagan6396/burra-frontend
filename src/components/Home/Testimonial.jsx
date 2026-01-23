// If you want a carousel, install: npm install swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: "Rituraj",
      role: "Family Vacation",
      rating: 5,
      content:
        "Burra Bungalow has an old World charm with all the necessities for a modern day traveller craving for quietness and space for reflection. The location is very much walkable to the Mall Road, so location isn’t much of a compromise either. The food, the support staff Hemant and his wife are so generous and they turn up some really delectable homemade fare. Do try the Oriental menu one of the nights. The neatness, the large rooms, the amenities are a big plus. The host Mrinalini ji is just a phone call away and she did ensure we have an overall seamless and a peaceful stay. A must recommended and a unique home stay!!",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Niharika",
      role: "Honeymoon Trip",
      rating: 5,
      content:
        "Our stay at Burra Bunglow was absolutely delightful ! Mrinalini was a wonderful host and made our stay extremely comfortable. She made sure she shared all the information about our stay beforehand while made our check-in process super smooth. What strikes you the most is the level of cleanliness of the property (Something we were very particular about given that we were travelling with a toddler). Highly remmend for those travelling with kids and families. Definitely coming back to stay again",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Robyn",
      role: "Weekend Retreat",
      rating: 4,
      content:
        "Loved our stay in Mussoorie. Hemant made us feel so very welcome and created delicious meals for us. A comfortable place and large enough for a group or family looking for a space to spend time relaxing together. A lovely home with everything you need to enjoy a peaceful stay!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Subhro",
      role: "Business Traveler",
      rating: 5,
      content:
        "It was an amazing stay. Well decorated with a sense of taste. Amazing service, the cook and the helper was simply outstanding. They cooked us fantastic meals and always proactive in asking us if we need anything else. Had a very relaxed stay and will definitely recommend. Mrinalini's mother was super friendly and we had an amazing chat, made me feel like a family member. Thanks Mrinalini for the amazing stay. It's an amazing, spacious stay and the decor was classy. Thanks for everything!",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-amber-50 via-white to-stone-50 py-16 px-4 md:px-8">
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
        <div className="relative">
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
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
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
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-amber-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-amber-600">
                        {testimonial.role}
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
      </div>
    </section>
  );
};

export default TestimonialsCarousel;