import Nav from "./component/Nav"
import Footer from "./component/Footer"
import Home from "./pages/Home"
import Location from "./pages/Location"
import Group from "./pages/Group"
import Diary from "./pages/Diary"
import Location2 from "./pages/Location-2"
import Location3 from "./pages/Location-3"
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
            </Routes>
        <Footer/>
    </div>
  )
}

export default MyApp