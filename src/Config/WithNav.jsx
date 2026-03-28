import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"
import { Outlet } from "react-router-dom"
function WithNav() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
export default WithNav
