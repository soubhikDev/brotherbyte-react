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


export default function Hero() {
  return (
    <>
        <div className="HeroMain">
            <div className="common_width HeroSub">
                <div className="hero_text">
                    <h4>Delicious</h4>
                    <h1>Food Delivery</h1>
                    <h2>during your Trip</h2>
                    <h3>Call & Book</h3>
                </div>
                <div className="hero_img">
                    <img className='biriyani' src={Biriyani} alt="" />
                    <img src={Mint1} alt="" />
                    <img src={Mint2} alt="" />
                    <img src={Mint3} alt="" />
                </div>
            </div>
            <img className='LeftCloud' src={LeftCloud} alt="" />
            <img className='RightCloud' src={RightCloud} alt="" />
            <img className='ROnion' src={ROnion} alt="" />
            <img className='LTOnion' src={LTOnion} alt="" />
            <img className='LOnion' src={LOnion} alt="" />
        </div>
    </>
  )
}
