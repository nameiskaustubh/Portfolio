import Navbar from './components/Navbar'
import HeroAbout from './components/HeroAbout';
// import About from './components/About'
import Education from './components/Education';
import Skills from './components/Skills';
import './App.css'
import LeetCodeTracker from "./components/LeetCodeTracker";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <section id='hero'>
      <HeroAbout />
      </section>
      {/* <About/> */}
      <section id='education'>
      <Education/>
      </section>
      <Skills/>
      <section id='leetcode'>
      <LeetCodeTracker username="afcpwRGndV" />
      </section>
      <section id="projects">
      <ProjectsSection />
      </section>
      <section id='contact'>
        <Footer/>
      </section>
    </div>
  );
}


export default App;
