import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ExhibitionIntro from './components/ExhibitionIntro'
import Seminar from './components/Seminar'
import ExhibitionMap from './components/ExhibitionMap'
import Visit from './components/Visit'
import CurvedLoopBanner from './components/CurvedLoopBanner'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BackgroundMusic from './components/BackgroundMusic'
import ResultRsvpPage from './pages/ResultRsvpPage'
import VerifyPage from './pages/VerifyPage'
import ScanPage from './pages/ScanPage'
import RevpPage from './pages/RevpPage'
import RegisterModal from './components/RegisterModal'

function HomePage({ onOpenRegister }) {
  return (
    <>
      <Hero onOpenRegister={onOpenRegister} />
      <ExhibitionIntro />
      <Seminar onOpenRegister={onOpenRegister} />
      <ExhibitionMap />
      <CurvedLoopBanner />
      <Visit />
      <Sponsors />
      <FAQ />
    </>
  )
}

function App() {
  const [registerOpen, setRegisterOpen] = useState(false)

  return (
    <>
      <Header onOpenRegister={() => setRegisterOpen(true)} />
      <BackgroundMusic />
      <ScrollToTop />
      <main className="onepage">
        <Routes>
          <Route path="/" element={<HomePage onOpenRegister={() => setRegisterOpen(true)} />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/result-rsvp" element={<ResultRsvpPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/rsvp" element={<RevpPage />} />
          <Route path="/revp" element={<Navigate to="/rsvp" replace />} />
          <Route path="/RSVP-dashboard" element={<Navigate to="/rsvp" replace />} />
        </Routes>
      </main>
      <Footer />
      <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />
    </>
  )
}

export default App
