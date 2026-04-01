import { useLocation } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"
import { Outlet } from "react-router-dom"

function WebsiteLayout() {
    const location = useLocation()

    const hideLayout = ["/sign-in", "/sign-up"].includes(location.pathname)

    return (
        <>
            {!hideLayout && <Navbar />}
            <Outlet />
            {!hideLayout && <Footer />}
        </>
    )
}

export default WebsiteLayout