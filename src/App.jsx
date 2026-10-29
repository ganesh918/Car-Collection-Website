import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/layout/Layout'
import { ComparisonProvider } from './context/ComparisonContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import About from './pages/About'
import BookTestDrive from './pages/BookTestDrive'
import Brands from './pages/Brands'
import CarDetails from './pages/CarDetails'
import Collection from './pages/Collection'
import Compare from './pages/Compare'
import Contact from './pages/Contact'
import Enquiry from './pages/Enquiry'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <ComparisonProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="collection" element={<Collection />} />
                <Route path="cars/:id" element={<CarDetails />} />
                <Route path="brands" element={<Brands />} />
                <Route path="compare" element={<Compare />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="book-test-drive" element={<BookTestDrive />} />
                <Route path="enquiry" element={<Enquiry />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ComparisonProvider>
      </WishlistProvider>
    </ToastProvider>
  )
}
