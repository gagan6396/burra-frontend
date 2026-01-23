import Navbar from '../Navbar'
import ImageSlider from '../ImageSlider'
import HeroSection from './HeroSection'
import RoomsSection from './RoomSection'
import AmenitiesSection from './Ameneties'
import ParallaxBanner from './Parallax'
import TestimonialsCarousel from './Testimonial'
import FAQ from './FAQ'
import Footer from '../Footer'

function Homepage() {
  return (
    <>
    <Navbar/>
    <ImageSlider/>
    <HeroSection/>
    <RoomsSection/>
    <AmenitiesSection/>
    <ParallaxBanner/>
    <TestimonialsCarousel/>
    {/* <FAQ/> */}
    <Footer/>
    </>
  )
}

export default Homepage
