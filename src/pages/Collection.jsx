import { AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarCard from '../components/cars/CarCard'
import CollectionFilters from '../components/cars/CollectionFilters'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'
import { cars } from '../data/cars'
import { usePageTitle } from '../hooks/usePageTitle'

function sortCars(list, sort) {
  const copy = [...list]
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'hp-desc':
      return copy.sort((a, b) => b.horsepower - a.horsepower)
    case 'year-desc':
      return copy.sort((a, b) => b.year - a.year)
    case 'rating-desc':
      return copy.sort((a, b) => b.rating - a.rating)
    default:
      return copy.sort((a, b) => b.rating * b.price - a.rating * a.price)
  }
}

export default function Collection() {
  usePageTitle('Collection')
  const [params] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [brand, setBrand] = useState(params.get('brand') || 'All')
  const [sort, setSort] = useState('featured')
  const [fuelType, setFuelType] = useState('All')
  const [priceMax, setPriceMax] = useState(350000)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = cars.filter((car) => {
      if (category !== 'All' && car.category !== category) return false
      if (brand !== 'All' && car.brand !== brand) return false
      if (fuelType !== 'All' && car.fuelType !== fuelType) return false
      if (car.price > priceMax) return false
      if (!q) return true
      return (
        car.name.toLowerCase().includes(q) ||
        car.brand.toLowerCase().includes(q) ||
        car.category.toLowerCase().includes(q) ||
        car.tagline.toLowerCase().includes(q)
      )
    })
    return sortCars(list, sort)
  }, [search, category, brand, sort, fuelType, priceMax])

  const reset = () => {
    setSearch('')
    setCategory('All')
    setBrand('All')
    setSort('featured')
    setFuelType('All')
    setPriceMax(350000)
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Gallery"
          title="The Complete Collection"
          subtitle="Search, filter, and sort through our premium inventory of luxury, sports, SUV, and supercar models."
        />
        <CollectionFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          sort={sort}
          setSort={setSort}
          fuelType={fuelType}
          setFuelType={setFuelType}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          resultCount={filtered.length}
          onReset={reset}
        />

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-white/15 py-20 text-center">
            <p className="font-display text-xl text-white">No vehicles match your criteria</p>
            <p className="mt-2 text-muted">Try adjusting filters or search terms.</p>
            <button type="button" onClick={reset} className="mt-6 text-chrome-light underline">
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
