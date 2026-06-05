import Header from './components/Header'
import Terminos from './components/Terminos'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Terminos />
      </div>
      <Footer />
    </div>
  );
}
