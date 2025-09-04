import Nav from "./component/Nav"
import Footer from "./component/Footer"
import Home from "./pages/Home"
import Location from "./pages/Location"
import Group from "./pages/Group"
import Group2 from "./pages/Group2"
import Group3 from "./pages/Group3"
import GroupCard from "./component/GroupCard"
import Diary from "./pages/Diary"
import Diary2 from "./pages/Diary2"
import Member from "./pages/Member-data"
import MemberCity from "./pages/Member-city"
import MemberDiary from "./pages/Member-diary"
import Location2 from "./pages/Location-2"
import Location3 from "./pages/Location-3"
import Log from "./component/Log"
import Sign from "./component/Sign"
import { Route, Routes } from "react-router-dom"


const MyApp = () => {
  return (
    <div className="wrap">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/location' element={<Location />}></Route>
        <Route path='/group' element={<Group />}></Route>
        <Route path='/group2' element={<Group2 />}></Route>
        <Route path='/group3' element={<Group3 />}></Route>
        <Route path='/GroupCardStyle' element={<GroupCard />}></Route>
        <Route path='/diary' element={<Diary />}></Route>
        <Route path='/diary2' element={<Diary2 />}></Route>
        <Route path='/location2' element={<Location2 />}></Route>
        <Route path='/location3' element={<Location3 />}></Route>
        <Route path='/member' element={<Member />}></Route>
        <Route path='/memberCity' element={<MemberCity />}></Route>
        <Route path='/memberdiary' element={<MemberDiary />}></Route>
        <Route path='/log' element={<Log />}></Route>
        <Route path='/sign' element={<Sign />}></Route>

      </Routes>
      <Footer />
    </div>
  )
}

export default MyApp