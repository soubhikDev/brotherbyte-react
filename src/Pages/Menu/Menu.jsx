import React, { useEffect } from 'react'
import PageHero from '../../Components/PageHeros/PageHero'
import './Menu.css'
import ThaliMenuListHero from '../../assets/ThaliMenuListHero.png'
import CardSection from '../../Components/CardSection/CardSection'

export default function Menu() {
    const PageHeroData = {
        title: 'Menu',
        img: ThaliMenuListHero
      }
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <>
        <div className="MenuMain">
          <PageHero PageHeroData={PageHeroData} />
            <div className="common_width">
                <CardSection />
            </div>
        </div>
    </>
  )
}
