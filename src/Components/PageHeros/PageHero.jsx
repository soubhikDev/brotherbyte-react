import React from 'react'
import './PageHero.css'
import GreenChilli2 from '../../assets/GreenChilli2.png'
import GreenChilli1 from '../../assets/GreenChilli1.png'
import LOnion from '../../assets/LOnion.png'
import ROnion from '../../assets/ROnion.png'


export default function PageHero({PageHeroData}) {
  return (
    <>
        <div className="PageHeroMain">
            <div className="common_width PageHeroSub">
                <h1>{PageHeroData.title}</h1>
                <img className='mainImgPH' src={PageHeroData.img} alt={PageHeroData.title} />
                
            </div>
            <img src={GreenChilli2} alt={GreenChilli2} />
            <img src={GreenChilli1} alt={GreenChilli1} />
            <img src={LOnion} alt={LOnion} />
            <img src={ROnion} alt={ROnion} />
        </div>
    </>
  )
}
