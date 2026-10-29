import BrandMarquee from '../components/home/BrandMarquee'
import CategoriesSection from '../components/home/CategoriesSection'
import ExperienceCTA from '../components/home/ExperienceCTA'
import FeaturedCars from '../components/home/FeaturedCars'
import Hero from '../components/home/Hero'
import JourneySection from '../components/home/JourneySection'
import PhilosophySection from '../components/home/PhilosophySection'
import PressStrip from '../components/home/PressStrip'
import ServicesSection from '../components/home/ServicesSection'
import ShowcaseSpotlight from '../components/home/ShowcaseSpotlight'
import StatsBar from '../components/home/StatsBar'
import TestimonialsSection from '../components/home/TestimonialsSection'
import PageTransition from '../components/ui/PageTransition'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle('')
  return (
    <PageTransition>
      <Hero />
      <StatsBar />
      <BrandMarquee />
      <PhilosophySection />
      <FeaturedCars />
      <ShowcaseSpotlight />
      <CategoriesSection />
      <JourneySection />
      <ServicesSection />
      <TestimonialsSection />
      <PressStrip />
      <ExperienceCTA />
    </PageTransition>
  )
}
