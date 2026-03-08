import Header from './components/Header'
import Hero from './components/Hero'
import ExhibitionIntro from './components/ExhibitionIntro'
import Program from './components/Program'
import Seminar from './components/Seminar'
import ExhibitionMap from './components/ExhibitionMap'
import Registration from './components/Registration'
import ExhibitionShop from './components/ExhibitionShop'
import Visit from './components/Visit'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main className="onepage">
        <Hero />
        <ExhibitionIntro />
        <Program />
        <Seminar />
        <ExhibitionMap />
        <Registration />
        <ExhibitionShop />
        <Visit />
        <Sponsors />
        <FAQ />
        <Footer />
      </main>
    </>
  )
}

export default App
