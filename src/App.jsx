import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Snowfall from 'react-snowfall'

import Navbar from './components/Navbar'
import ImageSlider from './components/ImageSlider'
import Homepage from './components/Home/Homepage'
import About from './components/about/About'
import Contact from './components/contact/Contact'

function App() {
  return (
    <>
      {/* ❄️ Snowfall across entire website */}
      {/* <Snowfall
        snowflakeCount={120}
        radius={[0.5, 2.5]}
        speed={[0.5, 1.5]}
        wind={[-0.5, 1]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none', // IMPORTANT
          zIndex: 50,
        }}
      /> */}

      {/* Website Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App