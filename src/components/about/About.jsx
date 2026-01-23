import React from "react";
import Banner from "./Banner";

import Navbar from "../Navbar";
import Footer from "../Footer";
import WelcomeSection from "./Hero";
import FAQ from "../Home/FAQ";
import ResortGallery from "./ImageGrid";
import ValuesComponent from "./Values";
import ExperienceSection from "./ExpirienceSection";
import BurraBungalow from "./BurraBungalow";
import AnnexeSection from "./BurraBungalow";
import AdditionalAccommodationSection from "./BurraBungalow";

function About() {
  return (
    <>
      <Navbar />
      <Banner />
      <WelcomeSection />
      <AdditionalAccommodationSection/>
      {/* <BurraBungalow/> */}
      {/* <ValuesComponent /> */}
      <ResortGallery />
      <ExperienceSection />
      <FAQ />
      <Footer />
    </>
  );
}

export default About;
