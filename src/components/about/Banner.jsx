import { useState, useEffect } from "react";

export default function AboutUsBanner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-20">
      <img
        src={isMobile ? "/About US banner_V01.webp" : "/About US banner_V01.webp"}
        alt="About Us"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}