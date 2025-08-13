import Nav from "./component/Nav"
import Footer from "./component/Footer"
import Home from "./pages/Home"
import Location from "./pages/Location"
import Group from "./pages/Group"
import Diary from "./pages/Diary"
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
            </Routes>
        <Footer/>
    </div>
  )
}

export default MyApp