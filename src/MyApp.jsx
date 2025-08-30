import Nav from "./component/Nav"
import Footer from "./component/Footer"
import Home from "./pages/Home"
import Location from "./pages/Location"
import Group from "./pages/Group"
import Diary from "./pages/Diary"
import Member from "./pages/Member-data"    
import Location2 from "./pages/Location-2"
import Location3 from "./pages/Location-3"
<<<<<<< HEAD
import Log from "./component/Log"
import Sign from "./component/Sign"
=======
import Group2 from "./pages/Group2"
>>>>>>> a7b4d5cfb5337c872c708b5501e968b42ad0b15f
import { Route, Routes } from "react-router-dom"

const MyApp = () => {
  return (
    <div className="wrap">
        <Nav/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/location' element={<Location/>}></Route>
                <Route path='/group' element={<Group/>}></Route>
                <Route path='/diary' element={<Diary/>}></Route>
                <Route path='/location2' element={<Location2/>}></Route>
                <Route path='/location3' element={<Location3/>}></Route>
                <Route path='/group2' element={<Group2/>}></Route>
                <Route path='/member' element={<Member/>}></Route>
                <Route path='/log' element={<Log/>}></Route>
                <Route path='/sign' element={<Sign/>}></Route>

            </Routes>
        <Footer/>
    </div>
  )
}

export default MyApp