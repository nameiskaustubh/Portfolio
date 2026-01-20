import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Capabilities from "./pages/Capabilities";
import DSA from "./pages/DSA";
import Work from "./pages/Work";
import Teaching from "./pages/Teaching";
import ProfessionalEngagements from "./pages/ProfessionalEngagements";
import Contact from "./pages/Contact";

import "./App.css";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Capabilities" element={<Capabilities />} />
        <Route path="/DSA" element={<DSA />} />
        <Route path="/Work" element={<Work />} />
        <Route path="/Teaching" element={<Teaching />} />
        <Route path="/ProfessionalEngagements" element={<ProfessionalEngagements />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}


function App() {
  return (
    <Router>
      <div className="App bg-gray-800 min-h-screen flex flex-col relative">
        
        <Navbar />

      
        <main className="flex-grow relative z-10">
          <AnimatedRoutes />
        </main>

       
        <Footer />
      </div>
    </Router>
  );
}

export default App;
