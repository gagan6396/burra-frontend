const WelcomeSection = () => {
  return (
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
            Burra Bungalow is a historic house that has silently stored more than a century of memories, moods, and charm. It is tucked away among birdsongs and old stately deodars.
            Burra Bungalows, the British word for "big," were previously home to plantation managers in the enormous Assamese tea estates where our parents worked. This is where the name originates. After our father retired from the tea gardens, our mother painstakingly and carefully rebuilt this house, which is a true work of love.
            The cottage has been subtly updated for comfort, yet its vintage charm is still very much there. The house is filled with antique furniture and our mother's varied collection of paintings, artefacts, and curios, each of which has a backstory we would love to tell you.
          </p>

          <p>
            Burra Bungalow offers dedicated parking for up to three cars, a 24×7 water supply from a spring, good Wi-Fi connectivity, and a peaceful setting surrounded by rose bushes and trees. The house is single-level, fully carpeted, and comfortably accommodates up to six guests.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;