import { BrowserRouter,Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./Pages/Menu/Menu";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
// import MenuList from "./Components/MenuList/MenuList";
import WebsiteLayout from "./Layout/WebsiteLayout";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Payment from "./Pages/Payment/Payment";
import GroupOrder from "./Pages/GroupOrder/GroupOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu/>} />
          {/* <Route path="/menu/menu-lists/:id" element={<MenuList />}/> */}
          <Route path="/about" element={<About  />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/payment" element={<Payment />}/>
          <Route path="/group-order" element={<GroupOrder />}/>
        </Route>

      </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
