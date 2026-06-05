import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Terminos from './components/Terminos'
import Footer from './components/Footer'
import DeleteAccountPage from './pages/DeleteAccountPage'

function HomePage() {
  return (
    <>
      <Header />
      <div className="flex-1">
        <Terminos />
      </div>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
