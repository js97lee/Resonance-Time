import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ExhibitionIntro from './components/ExhibitionIntro'
import Program from './components/Program'
import Seminar from './components/Seminar'
import ExhibitionMap from './components/ExhibitionMap'
import Registration from './components/Registration'
import Visit from './components/Visit'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import MobilePreviewBtn from './components/MobilePreviewBtn'
import RegisterPage from './pages/RegisterPage'
import ResultRsvpPage from './pages/ResultRsvpPage'
import RSVPDashboardPage from './pages/RSVPDashboardPage'

function HomePage() {
  return (
    <>
      <Hero />
      <ExhibitionIntro />
      <Program />
      <Seminar />
      <ExhibitionMap />
      <Registration />
      <Visit />
      <Sponsors />
      <FAQ />
    </>
  )
}

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <MobilePreviewBtn />
      <main className="onepage">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/result-rsvp" element={<ResultRsvpPage />} />
          <Route path="/RSVP-dashboard" element={<RSVPDashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
