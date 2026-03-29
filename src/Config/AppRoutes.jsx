import { Route, Routes } from "react-router-dom"
import WithNav from "./WithNav"
import Home from "../Pages/Home/Home"
import MenuCard from "../Components/MenuCard/MenuCard"
import Menu from "../Pages/Menu/Menu"
import About from "../Pages/About/About"
import Contact from "../Pages/Contact/Contact"

function AppRoutes() {
  return (
    <Routes>
      {/* Routes WITH navbar */}
      <Route element={<WithNav />}>
        <Route path="/" element={<Home key={location.pathname}/>} />
        <Route path="/menu" element={<Menu key={location.pathname}/>} />
        <Route path="/menu/menu-lists/:id" element={<MenuCard key={location.pathname}/>} />
        <Route path="/about" element={<About key={location.pathname}/>} />
        <Route path="/contact" element={<Contact key={location.pathname}/>} />
        {/* <Route path="/about" element={<About key={location.pathname}/>} />
        <Route path="/contact" element={<Contact key={location.pathname}/>} />
        <Route path="/work" element={<Work key={location.pathname}/>} />
        <Route path="/service" element={<OurService key={location.pathname}/>} />
        <Route path="/ourteam" element={<OurTeam key={location.pathname}/>} />
        <Route path="/career" element={<Career key={location.pathname}/>} />
        <Route path="/work/workdetails/:id" element={<WorkDetails key={location.pathname}/>} /> */}
      </Route>
    </Routes>
  )
}

export default AppRoutes