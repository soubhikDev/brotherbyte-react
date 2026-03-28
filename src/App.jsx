import { useLocation } from 'react-router-dom';
import './App.css'
import AppRoutes from './Config/AppRoutes'

function App() {
  const location = useLocation();
  return (
    <>
        <AppRoutes key={location.pathname}/>
    </>
  )
}

export default App
