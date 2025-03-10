import Signup from "./assets/Signup"
import Table from "./assets/Table"
import Update from "./assets/Update"
import Toster from "./Toster"
import Search from "./assets/Searchbox"
import {Route,Routes} from 'react-router-dom'
import Mail from "./assets/Mail"
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom',
  });
  return (

    <>
   <Toster/>
   <Routes>
   <Route path="/" element={<Signup/>} />
    <Route path="/Table" element={<Table/>} />
    <Route path="/Update/:id" element={<Update/>}/>
    <Route path="/Search" element={<Search/>}/>
    <Route path="/Mail" element={<Mail/>}/>
    </Routes>
    
    </>
  )
}

export default App