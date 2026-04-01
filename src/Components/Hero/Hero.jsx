import React from 'react'
import './Hero.css' 
import Biriyani from '../../assets/BiriyaniHero.png'
import Mint1 from '../../assets/Mint1.png'
import Mint2 from '../../assets/Mint2.png'  
import Mint3 from '../../assets/Mint3.png'
import ROnion from '../../assets/ROnion.png'
import LTOnion from '../../assets/LTOnion.png'
import LOnion from '../../assets/LOnion.png'
import RightCloud from '../../assets/RightCloud.png'
import LeftCloud from '../../assets/LeftCloud.png'
import BrotherByteLOGO from '../../assets/BrotherByteLOGO.png'
import BannerHero from '../../assets/BannerHero.png'
import { useNavigate } from "react-router-dom";


export default function Hero() {
    const navigate = useNavigate();
    
  return (
    <>
        <div className="HeroMain">
            <div className="common_width HeroSub">
                <div className="hero_text">
                    <h4>Delicious</h4>
                    <h1>Food Delivery</h1>
                    <h2>To your seat at the</h2>
                    <h2>next bus stop</h2>
                    <div className="HomeBannerBTN">
                        <button className="HomeBannerBTN1" onClick={() => navigate("/menu")}>Order Now</button>
                        <button className="HomeBannerBTN2" onClick={() => navigate("/contact")}>Call Now</button>
                    </div>
                </div>
                <img src={BannerHero} alt="Banner" />
            </div>
        </div>
    </>
  )
}
