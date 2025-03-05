import Signup from "./assets/Signup"
import Table from "./assets/Table"
import Update from "./assets/Update"
import Toster from "./Toster"
import Search from "./assets/Searchbox"
import {Route,Routes} from 'react-router-dom'
import Mail from "./assets/Mail"

function App() {
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