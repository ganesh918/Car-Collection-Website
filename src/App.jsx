import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import AuthLayout from './components/layout/AuthLayout'
import ProtectedLayout from './components/layout/ProtectedLayout'
import { AuthProvider } from './context/AuthContext'
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
import Account from './pages/auth/Account'
import AuthPageShell from './components/auth/AuthPageShell'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route element={<AuthLayout />}>
                  <Route element={<AuthPageShell />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                  </Route>
                  <Route path="forgot-password" element={<ForgotPassword />} />
                </Route>
                <Route element={<ProtectedLayout />}>
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
                  <Route path="account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
        </ComparisonProvider>
      </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
